import type { Resolvers } from '../types';

import * as queries from './queries';
import * as mutations from './mutations';
import * as customTypes from './custom-types';

const user: Resolvers = {
  Query: queries,
  Mutation: mutations,
  ...customTypes,
};

export default user;
