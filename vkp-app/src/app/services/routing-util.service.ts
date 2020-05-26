import { Injectable } from '@angular/core'
import { Router, ActivationEnd, Event } from '@angular/router'
import { filter, map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RoutingUtilService {
  currentRoute$ = new BehaviorSubject(null)
  constructor(private _router: Router) {
    this._router.events
      .pipe(
        filter((e: Event) => e instanceof ActivationEnd),
        map((e: ActivationEnd) => {
          if (e.snapshot.url.length > 0) {
            return '/' + e.snapshot.url[0].path
          }
        })
      )
      .subscribe(this.currentRoute$)
  }

  getCurrentRoute$() {
    return this.currentRoute$
  }
}
