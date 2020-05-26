import * as moment from 'moment'
import { Operation } from './operation'

export interface Actor {
  name: string
  status: string
  operation?: Operation
  updatedAt: Date
  updatedAgo: moment.Duration
}
