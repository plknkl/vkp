import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import { Job } from '../models/job'
import { GET_JOBS } from './queries/job_queries'

import { JobsData, JobUpdatedData } from './interfaces'

import { 
  SUBSCRIBE_TO_UPDATED_JOB, 
} from './queries/job_queries'

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // This should hold the websocket connection to avoid recreating it
  // on every component reload
  private _updatedJobSubject: Subject<Job>

  constructor(private apollo: Apollo) {}

  public getJobList$(period: Period) {
    return this.apollo
      .query<JobsData>({
        query: GET_JOBS,
        variables: {
          period
        },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map((result) => {
          result.data.jobs.forEach(item => {
            // unpack details stringed object
            item.batch.details = JSON.parse(item.batch.details as string)
          })
          return result.data.jobs
        })
      )
  }

  public updatedJobSubscription$() {
    if (this._updatedJobSubject === undefined) {
      this._updatedJobSubject = new Subject<Job>()
      this.apollo
        .subscribe<JobUpdatedData>({
          query: SUBSCRIBE_TO_UPDATED_JOB,
          fetchPolicy: 'no-cache'
        })
        .pipe(
          map((result) => {
            const log = result.data.jobUpdated
            return log
          })
        )
        .subscribe(this._updatedJobSubject)
    }
    // prevent the propagation of the first null of BehaviourSubject
    return this._updatedJobSubject
  }
  
}

export enum Period {
  Today,
  Yesterday,
  All
}
