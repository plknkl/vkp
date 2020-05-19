import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToolbarService } from '../services/toolbar.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputValue
  constructor( 
    private _router: Router,
    private _toolbarService: ToolbarService
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
}
