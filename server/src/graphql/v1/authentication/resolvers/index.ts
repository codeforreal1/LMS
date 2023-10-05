import type { Resolvers } from '../types';

import * as mutations from './mutations';

const authentication: Resolvers = {
  Mutation: mutations,
};

export default authentication;
