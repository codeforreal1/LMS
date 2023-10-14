import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { mapSchema, MapperKind } from '@graphql-tools/utils';

import Environment from '../../libs/Environment';
import { GraphqlContextV1 } from '../../libs/Graphql';

import globalTypeDefs from './index/typeDefs';
import globalResolvers from './index/resolvers';

import authenticationTypeDefs from './authentication/typeDefs';
import authenticationResolvers from './authentication/resolvers';

import credentialTypeDefs from './credential/typeDefs';
import credentialResolvers from './credential/resolvers';

import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import withAccessTokenVerificationDirective from './index/directives/withAccessTokenVerification';
import withCacheControlDirective from './index/directives/withCacheControl';
import withPurgeCacheDirective from './index/directives/withPurgeCache';

let schema = makeExecutableSchema({
  typeDefs: [
    globalTypeDefs,
    authenticationTypeDefs,
    credentialTypeDefs,
    userTypeDefs,
  ],
  resolvers: [
    globalResolvers,
    authenticationResolvers,
    credentialResolvers,
    userResolvers,
  ],
});

// Directives
schema = mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: function (field) {
    if (!Environment.disableGraphqlCaching) {
      withCacheControlDirective(field, withCacheControlDirective.name, schema);
      withPurgeCacheDirective(field, withPurgeCacheDirective.name, schema);
    }

    withAccessTokenVerificationDirective(
      field,
      withAccessTokenVerificationDirective.name,
      schema,
    );

    return field;
  },
});

const apolloServer = new ApolloServer<GraphqlContextV1>({
  schema: schema,
  includeStacktraceInErrorResponses: Environment.isNotProduction,
  introspection: Environment.isNotProduction,
});

export default apolloServer;
