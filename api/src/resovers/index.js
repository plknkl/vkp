import { GraphQLDateTime } from 'graphql-iso-date'

import articleResolvers from './article'
import actorResolvers from './actor'
import batchResolvers from './batch'
import operationResolvers from './operation'
import shiftResolvers from './shift'
import shopResolvers from './shop'
import jobResolvers from './job'
import logResolvers from './log'

const customScalarResolver = {
  Date: GraphQLDateTime
}

export default [
  customScalarResolver,
  articleResolvers,
  actorResolvers,
  batchResolvers,
  operationResolvers,
  shiftResolvers,
  shopResolvers,
  jobResolvers,
  logResolvers
]
