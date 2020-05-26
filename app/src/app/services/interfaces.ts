import { Actor } from '../models/actor'
import { Log } from '../models/log'
import { Operation } from '../models/operation'
import { Shift } from '../models/shift'
import { Batch } from '../models/batch'
import { Article } from '../models/article'
import { Job } from '../models/job'

export interface ActorData {
  actor: Actor
}

export interface ActorUpdatedData {
  actorUpdated: Actor
}

export interface ActorsData {
  actors: Actor[]
}

export interface ArticleData {
  article: Article
}

export interface ArticleUpdatedData {
  articleUpdated: Article
}

export interface ArticlesData {
  articles: Article[]
}

export interface LogCreatedData {
  logCreated: Log
}

export interface LogsData {
  logs?: Log[]
  maintenanceLogs?: Log[]
  jobLogs?: Log[]
}

export interface OperationsData {
  operations: Operation[]
}

export interface OperationData {
  operation: Operation
}

export interface ShiftData {
  shift: Shift
}

export interface ShiftsData {
  shifts: Shift[]
}

export interface BatchesData {
  batches: Batch[]
}

export interface JobsData {
  jobs: Job[]
}

export interface JobUpdatedData {
  jobUpdated: Job
}