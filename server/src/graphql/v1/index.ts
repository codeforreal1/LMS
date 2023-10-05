import { makeExecutableSchema } from '@graphql-tools/schema';

import globalTypeDefs from './index/typeDefs';
import globalResolvers from './index/resolvers';

import authenticationTypeDefs from './authentication/typeDefs';
import authenticationResolvers from './authentication/resolvers';

import credentialTypeDefs from './credential/typeDefs';
import credentialResolvers from './credential/resolvers';

import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

import verifyAccessTokenDirective from './index/directives/verifyAccessToken';

let schemaV1 = makeExecutableSchema({
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

schemaV1 = verifyAccessTokenDirective.apply(
  schemaV1,
  verifyAccessTokenDirective.name,
);

export default schemaV1;
