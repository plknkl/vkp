import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription, interval } from 'rxjs'
import * as moment from 'moment'
import { Actor } from '../../models/actor'
import { ToolbarService } from '../../services/toolbar.service'
import { ActorService } from '../../services/actor.service'
import { ACTOR } from '../../constants/routing-map'

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss'],
})
export class ActorListComponent implements OnInit, OnDestroy {
  items: Actor[]
  private _subscription: Subscription = new Subscription()

  constructor(
    private actorService: ActorService,
    private toolbarService: ToolbarService,
    private _router: Router,
  ) {
    this.toolbarService.changeTitle('monitoring')
    this.toolbarService.changeDetails('')
  }

  ngOnInit(): void {
    this._subscription.add(this.actorService
      .getActorList$()
      .subscribe((actors: Actor[]) => {
        this.items = actors.map(item => {
          const ms = moment().diff(item.updatedAt)
          item.updatedAgo = moment.duration(ms)
          return item
        })
        this._subscription.add(interval(1000).subscribe( () => {
          this.items.forEach(item => {
            const ms = moment().diff(item.updatedAt)
            item.updatedAgo = moment.duration(ms)
          })
        }))
      }))

    this._subscription.add(this.actorService
      .updatedActorSubscription$()
      .subscribe((actor: Actor) => {
        console.log(actor)
        this._updateActor(actor)
      }))
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  edit(item: Actor) {
    this.toolbarService.changeTitle(item.name)
    this._router.navigate([ACTOR, item.name])
  }

  private _updateActor(item: Actor) {
    if (item && this.items) {
      this.items.find((x) => x.name === item.name).status = item.status
    }
  }
}
