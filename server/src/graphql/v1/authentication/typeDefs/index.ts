import { gql } from 'graphql-tag';

export default gql`
  extend type Mutation {
    register(email: String!, password: String!): MutationResponse!
  }
`;
