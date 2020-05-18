import { Actor } from '../models/actor'
import { Operation } from '../models/operation'
import { Batch } from '../models/batch'
import { Shift } from '../models/shift'

export interface Job {
  status: String
  startedAt: Date
  quantity: Number
  endedAt: Date
  actor: Actor
  operation: Operation
  batch: Batch
  shift: Shift
}