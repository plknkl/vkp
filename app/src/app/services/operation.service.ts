import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { Operation } from '../models/operation'
import { 
  OperationsData,
  OperationData 
} from './interfaces'

import { 
  GET_OPERATIONS,
  GET_OPERATION,
  UPDATE_OPERATION, 
  DELETE_OPERATION ,
  CREATE_OPERATION
} from './queries/operation_queries'

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private apollo: Apollo) {}

  public getOperations$() {
    return this.apollo
      .query<OperationsData>({
        query: GET_OPERATIONS,
      })
      .pipe(
        map((result) => {
          return result.data.operations
        })
      )
  }

  public getOperation$(name: string) {
    return this.apollo
      .query<OperationData>({
        query: GET_OPERATION,
        variables: {
          name
        }
      })
      .pipe(
        map((result) => {
          return result.data.operation
        })
      )
  }
  
  public createOperation$(
    name: string,
    items: string
  ) {
    return this.apollo.mutate({
      mutation: CREATE_OPERATION,
      variables: {
        name,
        items
      },
    })
  }

  public updateOperation$(
    oldName: string,
    newName: string,
    items: string
  ) {
    return this.apollo.mutate({
      mutation: UPDATE_OPERATION,
      variables: {
        oldName,
        newName,
        items
      },
    })
  }

  public deleteOperation$(
    item: Operation,
  ) {
    return this.apollo.mutate({
      mutation: DELETE_OPERATION,
      variables: {
        name: item.name
      },
    })
  }
}
