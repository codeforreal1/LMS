import { gql } from 'graphql-tag';

export default gql`
  type Credential {
    id: Int!
    uuid: Int!
    email: String
  }
`;
