import * as moment from 'moment'
import { Operation } from './operation'
import { Shop } from './shop'
import { Job } from './job'

export interface Actor {
  name: string
  status: string
  operation: Operation
  shop: Shop
  currentJob: Job
  updatedAt: Date
  updatedAgo: moment.Duration
}
