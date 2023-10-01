import { gql } from 'graphql-tag';

export default gql`
  type Mutation {
    register(email: String!, password: String!): MutationResponse!
  }
`;
