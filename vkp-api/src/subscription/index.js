import { PubSub } from 'apollo-server'
import * as ACTOR_EVENTS from './actor'
import * as LOG_EVENTS from './log'
import * as JOB_EVENTS from './job'

export const EVENTS = {
  ACTOR: ACTOR_EVENTS,
  LOG: LOG_EVENTS,
  JOB: JOB_EVENTS
}
export default new PubSub()
