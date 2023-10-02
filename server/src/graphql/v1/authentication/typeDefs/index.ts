import { gql } from 'graphql-tag';

export default gql`
  extend type Mutation {
    register(email: String!, password: String!): RegisterResponse!
  }

  type RegisterResponse implements Response {
    success: Boolean!
    data: User
    message: String
    errors: [ErrorResponse!]
    code: String
  }
`;
