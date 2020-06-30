import gql from 'graphql-tag'

export const GET_JOBS = gql`
query jobs($period: Int){
  jobs(period: $period) {
    startedAt
    endedAt
    quantity
    actor {
      name
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
`
export const SUBSCRIBE_TO_UPDATED_JOB = gql`
subscription {
  jobUpdated {
    startedAt
    endedAt
    quantity
    actor {
      name
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
`
