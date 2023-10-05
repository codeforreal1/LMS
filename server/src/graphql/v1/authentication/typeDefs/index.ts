import { gql } from 'graphql-tag';

export default gql`
  extend type Mutation {
    login(email: String!, password: String!): LoginResponse!
    register(email: String!, password: String!): MutationResponse!
  }

  type LoginResponse implements Response {
    success: Boolean!
    data: User
    message: String
    errors: [ErrorResponse!]
    code: String
  }
`;
