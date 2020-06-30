import { Component, OnDestroy, NgZone } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ErrorService } from './services/error.service'
import { Subscription } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { ErrorPopUpComponent } from './error-pop-up/error-pop-up.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  private _subs = new Subscription()

  constructor(
    translateService: TranslateService,
    errorService: ErrorService,
    dialog: MatDialog,
    ngZone: NgZone
  ) {
    translateService.addLangs(['en', 'ru'])
    translateService.setDefaultLang('en');
    translateService.use('ru');

    this._subs.add(
      errorService.notifyError$.subscribe(() => {
        ngZone.run(() => {
          dialog.open(ErrorPopUpComponent)
        })
      })
    )
  }

  ngOnDestroy() {
    this._subs.unsubscribe()
  }
}
