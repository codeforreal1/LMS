import { gql } from 'graphql-tag';

export default gql`
  directive @verifyAccessToken on FIELD_DEFINITION

  type Query {
    _query_: ID
  }
  type Mutation {
    _mutation_: ID
  }

  interface Response {
    success: Boolean!
    message: String
    errors: [ErrorResponse!]
    code: String
  }

  type MutationResponse implements Response {
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
