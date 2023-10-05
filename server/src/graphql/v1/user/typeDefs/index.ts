import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    myProfile: MyProfileResponse @verifyAccessToken
    getUser(id: ID!): GetUserResponse @verifyAccessToken
  }

  type User {
    id: Int!
    uuid: String!
    firstName: String
    lastName: String
    credential: Credential
  }

  type GetUserResponse implements Response {
    success: Boolean!
    data: User
    message: String
    errors: [ErrorResponse!]
    code: String
  }

  type MyProfileResponse implements Response {
    success: Boolean!
    data: User
    message: String
    errors: [ErrorResponse!]
    code: String
  }
`;
