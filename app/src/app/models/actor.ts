import * as moment from 'moment'
import { Operation } from './operation'
import { Shop } from './shop'

export interface Actor {
  name: string
  status: string
  operation: Operation
  shop: Shop
  updatedAt: Date
  updatedAgo: moment.Duration
}
