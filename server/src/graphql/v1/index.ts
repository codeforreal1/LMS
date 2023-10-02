import globalTypeDefs from './index/typeDefs';
import globalResolvers from './index/resolvers';

import authenticationTypeDefs from './authentication/typeDefs';
import authenticationResolvers from './authentication/resolvers';

import credentialTypeDefs from './credential/typeDefs';
import credentialResolvers from './credential/resolvers';

import userTypeDefs from './user/typeDefs';
import userResolvers from './user/resolvers';

export default {
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
};
