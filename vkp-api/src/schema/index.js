import { gql } from 'apollo-server-express'
import articleSchema from './article'
import actorSchema from './actor'
import batchSchema from './batch'
import operationSchema from './operation'
import shiftSchema from './shift'
import jobSchema from './job'
import logSchema from './log'

// this is needed as root schema, to be able to expand
// it from other files.
const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [
  linkSchema,
  articleSchema,
  actorSchema,
  batchSchema,
  operationSchema,
  shiftSchema,
  jobSchema,
  logSchema
]
