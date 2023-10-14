import { getDirective } from '@graphql-tools/utils';
import type { GraphQLSchema, GraphQLFieldConfig } from 'graphql';
import { defaultFieldResolver, GraphQLError } from 'graphql';

import type { GraphqlContextV1 } from '../../../../libs/Graphql';
import type { AccessTokenPayload } from '../../../../libs/Authentication';
import AuthenticationLib from '../../../../libs/Authentication';
import errorCodes from '../../../../static/error-codes';

export type WithAccessTokenVerificationDirective = AccessTokenPayload;

function withAccessTokenVerification(
  fieldConfig: GraphQLFieldConfig<unknown, GraphqlContextV1, unknown>,
  directiveName: string,
  schema: GraphQLSchema,
) {
  const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

  if (directive) {
    const { resolve = defaultFieldResolver } = fieldConfig;

    fieldConfig.resolve = async function (parent, args, context, info) {
      const { req } = context;

      try {
        const tokens = AuthenticationLib.findTokensEntries(req);
        if (tokens.ACCESS_TOKEN == null) {
          throw new Error();
        }

        const accessTokenPayload = AuthenticationLib.parseAccessTokenPayload(
          tokens?.ACCESS_TOKEN ?? '',
        );

        if (accessTokenPayload == null) {
          throw new Error();
        }

        context.directives = {
          ...context.directives,
          withAccessTokenVerification: accessTokenPayload,
        };
        return resolve(parent, args, context, info);
      } catch (_) {
        throw new GraphQLError('Authentication error.', {
          extensions: { code: errorCodes.INVALID_TOKEN },
        });
      }
    };
    return fieldConfig;
  }
}

export default withAccessTokenVerification;
