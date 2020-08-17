import gql from 'graphql-tag'

export const SUBSCRIBE_TO_CREATED_LOG = gql`
subscription {
  logCreated {
    createdAt
    status
    entity {
      ...on Actor {
        name
      }
      ... on Job {
        actor {
          operation {
            name
          }
        }
      }
    }
  }
}
`

export const GET_LOGS = gql`
query {
  logs {
    createdAt
    status
    entity {
      ...on Actor {
        name
      }
      ... on Job {
        actor {
          operation {
            name
          }
        }
      }
    }
  }
}
`
