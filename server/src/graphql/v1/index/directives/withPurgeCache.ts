import fs from 'fs';

import { getDirective } from '@graphql-tools/utils';
import type { GraphQLSchema, GraphQLFieldConfig } from 'graphql';
import { defaultFieldResolver } from 'graphql';

import Keyv from '../../../../libs/Keyv';
import type { GraphqlContextV1 } from '../../../../libs/Graphql';
import type { CacheControlScope } from '../types';
import Redis from '../../../../libs/Redis';

/**
 * Type can only be a custom object. So figure out a way to determine if the certain type is scalar or custom object
 * ID, Int, Float, Boolean, String _. Literal Scalar Types
 * Type cannot be a enum. Enums are scalar as well.
 * Type cannot be a custom scalar.
 *
 */

const keyv = Keyv.getInstance();
const redis = Redis.getInstance();

function withPurgeCache(
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
        if (info.path.typename !== 'Mutation') {
          throw new Error(
            `@${withPurgeCache.name} can only be used with 'Mutation' parent type`,
          );
        }
        try {
          fs.writeFileSync('./info.json', JSON.stringify(info), 'utf-8');
          const withAccessTokenVerification =
            context?.directives?.withAccessTokenVerification;

          const userSessionKey =
            withAccessTokenVerification?.credential?.session_key;

          const scope = (directive['scope'] ?? 'PRIVATE') as CacheControlScope;

          if (scope === 'PRIVATE' && userSessionKey == null) {
            return resolve(parent, args, context, info);
          }

          const returnType = info?.returnType;

          const cacheKey = `${returnType}${
            !(userSessionKey == null) ? `|${userSessionKey}` : ''
          }`;

          const matchedKeys = await redis.keys(
            `${keyv.opts.store
              ._getNamespace()
              .slice('namespace:'.length)}:${cacheKey}|*`,
          );
          console.log(
            matchedKeys,
            `${keyv.opts.store
              ._getNamespace()
              .slice('namespace:'.length)}:${cacheKey}|*`,
          );
          if (matchedKeys?.length === 0) {
            return resolve(parent, args, context, info);
          }

          console.log('CACHE FOUND', matchedKeys);
          await redis.del(matchedKeys);

          return resolve(parent, args, context, info);
        } catch (error) {
          console.log('---LOG CACHE ERROR---', error);
          return resolve(parent, args, context, info);
        }
      };
      return fieldConfig;
    }
  }
}

export default withPurgeCache;
