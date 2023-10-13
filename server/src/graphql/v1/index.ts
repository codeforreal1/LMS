import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';

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

const disableGraphqlCaching =
  process.env.DISABLE_GRAPHQL_CACHING?.toLocaleLowerCase() === 'true';

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

schema = withAccessTokenVerificationDirective.apply(schema);

if (!disableGraphqlCaching) {
  schema = withCacheControlDirective.apply(schema);
}

const apolloServer = new ApolloServer<GraphqlContextV1>({
  schema: schema,
  includeStacktraceInErrorResponses: Environment.isNotProduction,
  introspection: Environment.isNotProduction,
});

export default apolloServer;
