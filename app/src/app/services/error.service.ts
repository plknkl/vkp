import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { errorSubject } from '../constants/api-url'

@Injectable({
  providedIn: 'root',
})

export class ErrorService {
  public notifyError$ = new Subject()
  constructor() {
    errorSubject.subscribe( () => {
        this.notifyError$.next()
      }
    )
  }
}


