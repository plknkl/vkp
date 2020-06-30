import { Component, OnInit, OnDestroy } from '@angular/core'
import { TranslateService } from '@ngx-translate/core';
import { ToolbarService } from '../services/toolbar.service'
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router'
import { MONITORING } from '../constants/routing-map'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  inputValue

  constructor( 
    private _toolbarService: ToolbarService,
    private _translateService: TranslateService,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._toolbarService.hideOptions()
    this._toolbarService.changeTitle('VKP')
    const role = localStorage.getItem('role')
    if (role) {
      this._router.navigate([MONITORING])
    }
  }

  ngOnDestroy() {
    this._toolbarService.showOptions()
  }

  login() {
    this._authenticationService.login(this.inputValue)
  }

  onLangClick(lang) {
    if (lang == "eng") {
      this._translateService.use('en')
    }

    if (lang == "rus") {
      this._translateService.use('ru')
    }
  }

}
