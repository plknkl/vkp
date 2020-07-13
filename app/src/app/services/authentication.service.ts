import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { MONITORING, JOBS } from '../constants/routing-map'
import { Role } from '../models/role'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentRole$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(
    private _router: Router,
  ) {
    const currentRole = localStorage.getItem('role')
    this.currentRole$.next(currentRole)
  }

  login(inputStr: String): void {
    if (inputStr == 'vkpadmin') {
      localStorage.setItem('role', Role.Admin)
      this.currentRole$.next(Role.Admin)
      this._router.navigate([MONITORING])
    } else if (inputStr == 'vkpmonitor') {
      localStorage.setItem('role', Role.Monitor)
      this.currentRole$.next(Role.Monitor)
      this._router.navigate([JOBS])
    } else if (inputStr == 'vkpoperations') {
      localStorage.setItem('role', Role.Operations)
      this.currentRole$.next(Role.Operations)
      this._router.navigate([MONITORING])
    } else {
      localStorage.removeItem('role')
      this.currentRole$.next(null)
      this._router.navigate(['/'])
    }
  }
}
