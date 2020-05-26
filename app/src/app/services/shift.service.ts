import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map } from 'rxjs/operators'
import { Shift } from '../models/shift'
import { 
  ShiftsData,
  ShiftData 
} from './interfaces'

import { 
  GET_SHIFTS,
  GET_SHIFT,
  UPDATE_SHIFT, 
  DELETE_SHIFT ,
  CREATE_SHIFT
} from './queries/shift_queries'

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private apollo: Apollo) {}

  public getShifts$() {
    return this.apollo
      .query<ShiftsData>({
        query: GET_SHIFTS,
      })
      .pipe(
        map((result) => {
          return result.data.shifts
        })
      )
  }

  public getShift$(name: string) {
    return this.apollo
      .query<ShiftData>({
        query: GET_SHIFT,
        variables: {
          name
        }
      })
      .pipe(
        map((result) => {
          return result.data.shift
        })
      )
  }
  
  public createShift$(
    name: string,
  ) {
    return this.apollo.mutate({
      mutation: CREATE_SHIFT,
      variables: {
        name,
      },
    })
  }

  public updateShift$(
    oldName: string,
    newName: string,
  ) {
    return this.apollo.mutate({
      mutation: UPDATE_SHIFT,
      variables: {
        oldName,
        newName,
      },
    })
  }

  public deleteShift$(
    item: Shift,
  ) {
    return this.apollo.mutate({
      mutation: DELETE_SHIFT,
      variables: {
        name: item.name
      },
    })
  }
}
