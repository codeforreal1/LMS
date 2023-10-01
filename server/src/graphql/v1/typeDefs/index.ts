import { gql } from 'graphql-tag';

import authentication from './authentication';
import user from './user';
import credential from './credential';

const global = gql`
  type Query
  type Mutation

  scalar Date

  type MutationResponse {
    success: Boolean!
    message: String
    errors: [ErrorResponse!]
    code: String
  }

  type ErrorResponse {
    path: String
    message: String
  }
`;

export default [global, authentication, user, credential];
