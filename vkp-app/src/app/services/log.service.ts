import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { BehaviorSubject } from 'rxjs'
import { Log } from '../models/log'
import { map, filter } from 'rxjs/operators'
import { LogCreatedData, LogsData } from './interfaces'

import { 
  SUBSCRIBE_TO_CREATED_LOG, 
  GET_LOGS, 
} from './queries/log_queries'


@Injectable({
  providedIn: 'root',
})
export class LogService {
  // This should hold the websocket connection to avoid recreating it
  // on every component reload
  private _createdLogSubscription: BehaviorSubject<Log>

  constructor(private apollo: Apollo) {}

  public createdLogSubscription$() {
    // transform into BehaviorSubject to get
    // the latest value on every new subscription
    if (this._createdLogSubscription === undefined) {
      this._createdLogSubscription = new BehaviorSubject<Log>(null)
      this.apollo
        .subscribe<LogCreatedData>({
          query: SUBSCRIBE_TO_CREATED_LOG,
          fetchPolicy: 'no-cache'
        })
        .pipe(
          map((result) => {
            const log = result.data.logCreated
            return log
          })
        )
        .subscribe(this._createdLogSubscription)
    }
    // prevent the propagation of the first null of BehaviourSubject
    return this._createdLogSubscription.pipe(filter((x) => x != null))
  }

  public getLogList$() {
    return this.apollo
      .query<LogsData>({
        query: GET_LOGS,
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map((result) => {
          return result.data.logs
        })
      )
  }

}

