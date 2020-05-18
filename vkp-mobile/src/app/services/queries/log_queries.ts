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
        batch {
          businessId
          article {
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
        batch {
          businessId
          article {
            name
          }
        }
      }
    }
  }
}
`

export const GET_MAINTENANCE_LOGS = gql`
query {
  maintenanceLogs {
    createdAt
    status
    entity {
      ... on Actor {
        name
      }
    }
  }
}
`

export const GET_JOB_LOGS = gql`
query {
  jobLogs {
    createdAt
    status
    entity {
      ... on Job {
        startedAt
        endedAt
        actor {
          name
          operation {
            name
          }
        }
        batch {
          businessId
          article {
            name
          }
        }
        shift { 
          name
        }
      }
    }
  }
}
`