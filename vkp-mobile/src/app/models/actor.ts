import { Operation } from './operation'

export interface Actor {
  name: string
  status: string
  operation?: Operation
}
