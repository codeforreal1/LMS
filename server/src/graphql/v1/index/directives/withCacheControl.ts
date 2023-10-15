import crypto from 'crypto';

import { getDirective } from '@graphql-tools/utils';
import type { GraphQLSchema, GraphQLFieldConfig } from 'graphql';
import { defaultFieldResolver } from 'graphql';

import Keyv from '../../../../libs/Keyv';
import type { CacheControlScope, Response } from '../types';
import type { GraphqlContextV1 } from '../../../../libs/Graphql';

const keyv = Keyv.getInstance();

const DEFAULT_MAX_AGE = 15;
const DEFAULT_SCOPE = 'PUBLIC';

function withCacheControl(
  fieldConfig: GraphQLFieldConfig<unknown, GraphqlContextV1, unknown>,
  directiveName: string,
  schema: GraphQLSchema,
) {
  {
    const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

    if (directive) {
      const { resolve = defaultFieldResolver } = fieldConfig;

      fieldConfig.resolve = async function (
        parent,
        args,
        context: GraphqlContextV1,
        info,
      ) {
        if (info.path.typename !== 'Query') {
          throw new Error(
            `@${withCacheControl.name} can only be used with 'Query' parent type`,
          );
        }

        try {
          const withAccessTokenVerification =
            context?.directives?.withAccessTokenVerification;

          const userSessionKey =
            withAccessTokenVerification?.credential?.session_key;
          const scope = (directive['scope'] ??
            DEFAULT_SCOPE) as CacheControlScope;

          if (scope === 'PRIVATE' && userSessionKey == null) {
            return resolve(parent, args, context, info);
          }

          const returnType = info?.returnType;

          const hash = crypto
            .createHash('sha256')
            .update(JSON.stringify(info))
            .digest('hex');

          const cacheKey = `${returnType}${
            !(userSessionKey == null) ? `|${userSessionKey}` : ''
          }|${hash}`;

          const cacheValue = await keyv.get(cacheKey);
          if (!(cacheValue == null)) {
            return JSON.parse(cacheValue);
          }

          const result = (await resolve(
            parent,
            args,
            context,
            info,
          )) as Response;

          if (result?.success) {
            const maxAge = ((directive['maxAge'] ?? DEFAULT_MAX_AGE) *
              1000) as number;
            await keyv.set(cacheKey, JSON.stringify(result), maxAge);
          }

          return result;
        } catch (_) {
          console.log('---LOG CACHE ERROR---', _);
          return resolve(parent, args, context, info);
        }
      };
      return fieldConfig;
    }
  }
}

export default withCacheControl;
