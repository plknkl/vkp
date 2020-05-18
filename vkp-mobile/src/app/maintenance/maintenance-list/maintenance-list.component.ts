import { Component, OnInit } from '@angular/core'
import { ToolbarService } from '../../services/toolbar.service'
import { ActorService } from '../../services/actor.service'
import { Actor } from '../../models/actor'
import { Subject } from 'rxjs'


@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss'],
})
export class MaintenanceListComponent implements OnInit {
  items$: Subject<Actor[]> = new Subject<Actor[]>()
  displayedColumns: string[]
  private _items: Actor[] = []

  constructor(
    private _toolbarService: ToolbarService,
    private _actorService: ActorService,
  ) {}

  ngOnInit(): void {
    this._toolbarService.changeTitle('Maintenance')

    this.displayedColumns = ['name', 'status'];

    this._actorService
      .getActorList$()
      .subscribe((actors: Actor[]) => {
        this.items$.next(actors)
      })

    this._actorService
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
  }

}
