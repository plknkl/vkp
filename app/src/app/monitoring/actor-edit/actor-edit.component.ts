import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Subscription, Observable, zip } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Actor } from '../../models/actor'
import { ActorService } from '../../services/actor.service'
import { ArticleService } from '../../services/article.service'
import { ShiftService } from '../../services/shift.service'
import { ToolbarService } from '../../services/toolbar.service'
import { NewJobDialogComponent } from '../new-job-dialog/new-job-dialog.component'
import { FinishJobDialogComponent } from '../finish-job-dialog/finish-job-dialog.component'
import { MONITORING } from '../../constants/routing-map'

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.scss'],
})
export class ActorEditComponent implements OnDestroy, OnInit {
  public actor$: Observable<Actor>
  private _paramsSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actorService: ActorService,
    private toolbarservice: ToolbarService,
    private _articleService: ArticleService,
    private _shiftService: ShiftService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.actor$ = this.actorService.getActor$(params.name, params.operation).pipe(
        tap((actor: Actor) => {
          this.toolbarservice.changeDetails(actor.status)
        })
      )
    })
  }

  onNewJobClick(actor: Actor) {
    this.newJobDialog(actor)
  }

  onFinishJobClick(actor: Actor) {
    this.finishJobDialog(actor)
  }

  onIdleClick(actor: Actor) {
    this.actorService.updateActorStatus$(
      actor.name, 
      actor.operation.name,
      'idle'
    ).subscribe(() => {
      this.router.navigate([MONITORING])
    })
  }

  onMaintenanceClick(actor: Actor) {
    this.actorService.updateActorStatus$(
      actor.name, 
      actor.operation.name,
      'maintenance'
    ).subscribe(() => {
      this.router.navigate([MONITORING])
    })
  }

  onBrokenClick(actor: Actor) {
    this.actorService.updateActorStatus$(
      actor.name, 
      actor.operation.name,
      'broken'
    ).subscribe(() => {
      this.router.navigate([MONITORING])
    })
  }

  newJobDialog(actor: Actor): void {
    zip(
     this._articleService.getArticles$(),
     this._shiftService.getShifts$()
    ).subscribe(([articles, shifts]) => {
      const items = JSON.parse(actor.operation.items)
      const dialogRef = this.dialog.open(NewJobDialogComponent, {
        width: '250px',
        data: { articles, shifts, items },
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.actorService.startActorProcess$(
            actor.name,
            actor.operation.name,
            // details
            JSON.stringify(
              {
                businessId: result.batchNumber,
                item: result.itemName
              }
            ),
            result.shiftName
          ).subscribe(
            () => {
              this.router.navigate([MONITORING])
            })
        }
      })
    })
  }

  finishJobDialog(actor: Actor): void {
    const dialogRef = this.dialog.open(FinishJobDialogComponent, {
      width: '250px',
      data: {},
    })

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result) {
        const quantity: number = +result
        this.actorService.finishActorProcess$(
          actor.name, actor.operation.name, quantity
        ).subscribe(() => {
          this.router.navigate([MONITORING])
        })
      }
    })
  }

  ngOnDestroy(): void {
    this._paramsSubscription.unsubscribe()
  }
}
