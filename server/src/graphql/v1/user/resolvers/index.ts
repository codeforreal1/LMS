import type { Resolvers } from '../types';

import * as queries from './queries';

const user: Resolvers = {
  Query: queries,
};

export default user;
