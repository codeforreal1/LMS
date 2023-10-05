import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      code
      errors {
        path
        message
      }
      data {
        id
        uuid
      }
    }
  }
`
