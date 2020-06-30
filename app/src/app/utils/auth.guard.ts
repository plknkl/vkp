import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot ) {
    const role = localStorage.getItem('role')
    if (role) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(role) === -1) {
        // role not authorised so redirect to login
        this._router.navigate(['/']);
        return false;
      }
      // authorised so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this._router.navigate(['/']);
    }
  }
}
