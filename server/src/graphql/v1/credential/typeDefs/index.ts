import { gql } from 'graphql-tag';

export default gql`
  type Credential {
    id: Int
    uuid: String
    email: String
  }
`;
