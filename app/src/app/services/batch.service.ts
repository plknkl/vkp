import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { BatchesData } from './interfaces'

import { GET_BATCHES } from './queries/batch_queries'

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private apollo: Apollo) {}

  public getBatchList$() {
    return this.apollo
      .query<BatchesData>({
        query: GET_BATCHES,
      })
      .pipe(
        map((result) => {
          return result.data.batches
        })
      )
  }
}
