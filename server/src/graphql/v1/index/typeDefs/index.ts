import { gql } from 'graphql-tag';

export default gql`
  type Query
  type Mutation

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
