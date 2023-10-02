import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    getUser: String
  }

  type User {
    id: Int!
    uuid: Int!
    firstName: String
    lastName: String
    credential: Credential
  }
`;
