import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import type { GraphQLSchema } from 'graphql';
import { defaultFieldResolver, GraphQLError } from 'graphql';

import dbEnums from '../../../../db/utils/enums';
import type { GraphqlContextV1 } from '../../../../libs/Graphql';
import JWTLib from '../../../../libs/JWT';
import errorCodes from '../../../../static/error-codes';

export interface VerifyAccessTokenDirectiveV1 {
  user: {
    id: number;
    uuid: string;
  };
  credential: {
    id: number;
    uuid: string;
    role: Partial<keyof (typeof dbEnums)['role']>;
    session_key: string;
  };
}

function verifyAccessToken<T extends GraphQLSchema>(
  schema: T,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (
          source,
          args,
          context: GraphqlContextV1,
          info,
        ) {
          const { req } = context;

          try {
            const accessToken = req.cookies?.ACCESS_TOKEN;
            if (accessToken == null) {
              throw new Error();
            }
            const tokenPayload = JWTLib.verifyAccessToken(accessToken);

            if (!('user' in tokenPayload && 'credential' in tokenPayload)) {
              throw new Error();
            }

            context.directives = {
              ...context.directives,
              verifyAccessToken: tokenPayload,
            };
            return resolve(source, args, context, info);
          } catch (error) {
            throw new GraphQLError('Authentication error.', {
              extensions: { code: errorCodes.INVALID_TOKEN },
            });
          }
        };
        return fieldConfig;
      }
    },
  });
}

export default { apply: verifyAccessToken, name: 'verifyAccessToken' };
