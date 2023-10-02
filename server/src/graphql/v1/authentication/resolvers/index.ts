import type { Resolvers } from '../types';

import mutations from './mutations';

const authentication: Resolvers = {
  Mutation: mutations,
};

export default authentication;
