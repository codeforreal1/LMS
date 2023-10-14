import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    myProfile: MyProfileResponse @withAccessTokenVerification
    getUser(id: ID!): GetUserResponse
      @withCacheControl(scope: PRIVATE)
      @withAccessTokenVerification
  }

  extend type Mutation {
    updateUser(id: ID!): GetUserResponse
      @withPurgeCache(scope: PRIVATE)
      @withAccessTokenVerification
  }

  type User {
    id: Int
    uuid: String
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
