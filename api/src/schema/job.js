import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    jobs(period: Int): [Job]
  }

  extend type Subscription {
    jobUpdated: Job!
  }

  type Job {
    status: String!
    startedAt: Date
    quantity: Int
    endedAt: Date
    actor: Actor
    operation: Operation
    batch: Batch
    shift: Shift
  }
`
