import gql from 'graphql-tag'

export const GET_BATCHES = gql`
  query {
    batches {
      businessId
      name
    }
  }
`
