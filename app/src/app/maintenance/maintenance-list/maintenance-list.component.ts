import { Component, OnInit, OnDestroy } from '@angular/core'
import { ToolbarService } from '../../services/toolbar.service'
import { ActorService } from '../../services/actor.service'
import { Actor } from '../../models/actor'
import { Subject, Subscription } from 'rxjs'


@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss'],
})
export class MaintenanceListComponent implements OnInit, OnDestroy {
  items$: Subject<Actor[]> = new Subject<Actor[]>()
  displayedColumns: string[]
  private _items: Actor[] = []
  private _subs: Subscription = new Subscription()

  constructor(
    private _toolbarService: ToolbarService,
    private _actorService: ActorService,
  ) {}

  ngOnInit(): void {
    this._toolbarService.changeTitle('maintenance')

    this.displayedColumns = ['operation', 'name', 'status'];

    this._subs.add(this._actorService
      .getActorList$()
      .subscribe((actors: Actor[]) => {
        this.items$.next(actors)
      })
    )

    this._subs.add(this._actorService
      .updatedActorSubscription$()
      .subscribe((actor: Actor) => {

        if (this._items.length >= 10) {
          this._items.pop()
        }

        this._items = this._items.filter((item) => {
          return (
            item.name !== actor.name &&
            item.status !== actor.status
          )
        })

        this._items.unshift(actor)
        this.items$.next(this._items)
      })
    )
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe()
  }

}
