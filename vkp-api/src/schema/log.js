import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    logs: [Log]
    maintenanceLogs: [Log]
    jobLogs: [Log]
  }

  extend type Subscription {
    logCreated: Log!
  }

  type Log {
    entityType: String!
    entity: LogEntity
    createdAt: Date
    status: String!
  }

  union LogEntity = Actor | Job
`
