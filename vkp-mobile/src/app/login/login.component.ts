import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToolbarService } from '../services/toolbar.service'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputValue
  constructor( 
    private _router: Router,
    private _toolbarService: ToolbarService,
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this._toolbarService.hideOptions()
  }

  login() {
    if (this.inputValue == 'm') {
      this._toolbarService.showOptions()
      this._router.navigate(['monitoring'])
    }
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
