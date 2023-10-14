import { gql } from 'graphql-tag';

export default gql`
  directive @withAccessTokenVerification on FIELD_DEFINITION
  directive @withCacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION
  directive @withPurgeCache(scope: CacheControlScope) on FIELD_DEFINITION

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
