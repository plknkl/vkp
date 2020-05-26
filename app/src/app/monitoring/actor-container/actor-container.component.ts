import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet, Params, Router } from '@angular/router'
import { ToolbarService } from '../../services/toolbar.service'
import { ActorService } from '../../services/actor.service'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { MONITORING } from '../../constants/routing-map'

@Component({
  selector: 'app-actor-container',
  templateUrl: './actor-container.component.html',
  styleUrls: ['./actor-container.component.scss'],
})
export class ActorContainerComponent implements OnInit, OnDestroy {
  list: boolean
  edit: boolean

  private _subscriptions: Subscription[] = []

  constructor(
    private _router: Router,
    private _routerOutlet: RouterOutlet,
    private _actorService: ActorService,
    private _toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.list = this._routerOutlet.activatedRouteData.list
    this.edit = this._routerOutlet.activatedRouteData.edit

    if (this.list) {
      this._toolbarService.changeTitle('Monitoring')
    }

    if (this.edit) {
      this._subscriptions.push(
        this._routerOutlet.activatedRoute.params
          .pipe(
            map((params: Params) => {
              const actor = this._actorService.getActorFromName(params.name)
              if (actor === null) {
                this._router.navigate([MONITORING])
              } else {
                this._toolbarService.changeTitle(actor.name)
                this._toolbarService.changeDetails(actor.status)
              }
              return actor
            })
          )
          .subscribe()
      )
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe())
  }
}
