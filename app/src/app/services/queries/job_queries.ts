import gql from 'graphql-tag'

export const GET_JOBS = gql`
query jobs($period: Int){
  jobs(period: $period) {
    startedAt
    endedAt
    quantity
    operation {
      name
    }
    actor {
      name
    }
    batch { 
      details
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
    operation {
      name
    }
    quantity
    actor {
      name
    }
    batch { 
      details
    }
    shift {
      name
    }
  }
}
`
