import crypto from 'crypto';

import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import type { GraphQLSchema } from 'graphql';
import { defaultFieldResolver } from 'graphql';

import type { GraphqlContextV1 } from '../../../../libs/Graphql';

function withCacheControl<T extends GraphQLSchema>(
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
          //   const { req } = context;

          try {
            const sha256 = crypto
              .createHash('sha256')
              .update(JSON.stringify(info))
              .digest('hex');

            console.log('---sha256---', sha256);
            context.directives = {
              ...context.directives,
              withCacheControl: {},
            };
            // After resolving, get the result and pass this result and info to worker threads and immediately return the result so that the request is not blocked.
            // In worker threads, create the sha256 hash from info and store the cache to redis with all those ttl and stale time config
            // When the same request is made, create the sha256 from info, find it in redis and if it matches, that is the cache value. Return the value immediately.
            // Figure out how to do scope=PUBLIC|PRIVATE using the session-key from cookie. One solution that I can think of is, just append the session key into the sha256 hash key if the cache control is private. Easiest solution.
            return resolve(source, args, context, info);
          } catch (_) {
            console.log('--', _);
            // throw new GraphQLError('Authentication error.', {
            //   extensions: { code: errorCodes.INVALID_TOKEN },
            // });
          }
        };
        return fieldConfig;
      }
    },
  });
}

export default {
  apply: function (schema: GraphQLSchema) {
    return withCacheControl(schema, withCacheControl.name);
  },
  name: withCacheControl.name,
};
