import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToolbarService } from '../services/toolbar.service'
import { RoutingUtilService } from '../services/routing-util.service'
import { MONITORING, LOG, MAINTENANCE, ADMINISTRATION, JOBS } from '../constants/routing-map'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  deferredPrompt: any
  showButton = false

  monitoringURL = MONITORING
  logURL = LOG
  maintenanceURL = MAINTENANCE
  administrationURL = ADMINISTRATION
  jobsURL = JOBS

  constructor(
    public toolbarService: ToolbarService,
    private _router: Router,
    public routingUtilService: RoutingUtilService
  ) {}

  ngOnInit(): void {}

  onMonitoringClick() {
    this._router.navigate([MONITORING])
  }

  onLogsClick() {
    this._router.navigate([LOG])
  }

  onMaintenanceClick() {
    this._router.navigate([MAINTENANCE])
  }

  onJobsClick() {
    this._router.navigate([JOBS])
  }

  onAdministrationClick() {
    this._router.navigate([ADMINISTRATION])
  }

  onButtonClick(btn: string) {
    this.toolbarService.buttonClick.next(btn)
  }
  // @HostListener('window:beforeinstallprompt', ['$event'])
  // onbeforeinstallprompt(e) {
  //   console.log(e)
  //   // Prevent Chrome 67 and earlier from automatically showing the prompt
  //   e.preventDefault()
  //   // Stash the event so it can be triggered later.
  //   this.deferredPrompt = e
  //   this.showButton = true
  // }

  // addToHomeScreen() {
  //   // hide our user interface that shows our A2HS button
  //   this.showButton = false
  //   // Show the prompt
  //   this.deferredPrompt.prompt()
  //   // Wait for the user to respond to the prompt
  //   this.deferredPrompt.userChoice.then((choiceResult) => {
  //     if (choiceResult.outcome === 'accepted') {
  //       console.log('User accepted the A2HS prompt')
  //     } else {
  //       console.log('User dismissed the A2HS prompt')
  //     }
  //     this.deferredPrompt = null
  //   })
  // }
}
