import { gql } from 'graphql-tag';

export default gql`
  directive @withAccessTokenVerification on FIELD_DEFINITION
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT

  directive @withCacheControl on FIELD_DEFINITION

  type Query {
    _query_: ID
  }
  type Mutation {
    _mutation_: ID
  }

  enum CacheControlScope {
    PUBLIC
    PRIVATE
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
