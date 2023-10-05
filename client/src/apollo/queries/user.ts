import { gql } from '@apollo/client'

export const MY_PROFILE = gql`
  query {
    myProfile {
      success
      message
      code
      data {
        id
        uuid
      }
    }
  }
`

export const GET_USER = gql`
  query ($id: ID!) {
    getUser(id: $id) {
      success
      message
      code
      data {
        id
        uuid
      }
    }
  }
`
