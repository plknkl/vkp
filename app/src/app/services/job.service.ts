import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { BehaviorSubject } from 'rxjs'
import { map, filter } from 'rxjs/operators'

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
  private _updatedJobSubscription: BehaviorSubject<Job>

  constructor(private apollo: Apollo) {}

  public getJobList$() {
    return this.apollo
      .query<JobsData>({
        query: GET_JOBS,
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map((result) => {
          return result.data.jobs
        })
      )
  }

  public updatedJobSubscription$() {
    if (this._updatedJobSubscription === undefined) {
      this._updatedJobSubscription = new BehaviorSubject<Job>(null)
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
        .subscribe(this._updatedJobSubscription)
    }
    // prevent the propagation of the first null of BehaviourSubject
    return this._updatedJobSubscription.pipe(filter((x) => x != null))
  }
  
}
