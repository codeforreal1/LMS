import { gql } from 'graphql-tag';

export default gql`
  type Query {
    _: ID
  }
  type Mutation {
    _2: ID
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
