import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActorService } from '../../services/actor.service'
import { Subscription } from 'rxjs'
import { Actor } from '../../models/actor'
import { ToolbarService } from '../../services/toolbar.service'
import { Router } from '@angular/router'
import { ACTOR } from '../../constants/routing-map'

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss'],
})
export class ActorListComponent implements OnInit, OnDestroy {
  items: Actor[]
  timer = '0:5:19'

  private actorListSubscription: Subscription
  private actorUpdateSubscription: Subscription

  constructor(
    private actorService: ActorService,
    private toolbarService: ToolbarService,
    private router: Router
  ) {
    this.toolbarService.changeTitle('Monitoring')
    this.toolbarService.changeDetails('')
  }

  ngOnInit(): void {
    this.actorListSubscription = this.actorService
      .getActorList$()
      .subscribe((actors: Actor[]) => {
        this.items = actors
      })

    this.actorUpdateSubscription = this.actorService
      .updatedActorSubscription$()
      .subscribe((actor: Actor) => {
        this._updateActor(actor)
      })
  }

  ngOnDestroy(): void {
    this.actorListSubscription.unsubscribe()
    this.actorUpdateSubscription.unsubscribe()
  }

  edit(item: Actor) {
    this.toolbarService.changeTitle(item.name)
    this.router.navigate([ACTOR, item.name])
  }

  private _updateActor(item: Actor) {
    if (item && this.items) {
      this.items.find((x) => x.name === item.name).status = item.status
    }
  }
}
