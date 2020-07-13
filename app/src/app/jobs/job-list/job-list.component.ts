import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { ToolbarService } from '../../services/toolbar.service'
import { JobService, Period } from '../../services/job.service'
import { Job } from '../../models/job'
import { Subject, Subscription } from 'rxjs'
import { exportData } from './job-exporter'


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {
  items$: Subject<Job[]> = new Subject<Job[]>()
  displayedColumns: string[]
  private _items: Job[] = []
  private  _subs: Subscription = new Subscription()
  private  _updateSub: Subscription = new Subscription()

  constructor(
    private _toolbarService: ToolbarService,
    private _jobService: JobService,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._toolbarService.changeTitle('jobs')
    this._toolbarService.export.next(true)
    this.displayedColumns = [
      'shift', 'actorName',
      'batchNum', 'article', 'quantity',
      'fromDate', 'toDate'
    ];

    this._loadJobs(Period.Today)

    this._subs.add(
      this._toolbarService.exportTrigger.subscribe((result) => {
        if (result) {
          exportData(this._items)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this._toolbarService.export.next(false)
    this._subs.unsubscribe()
    this._updateSub.unsubscribe()
  }

  private _loadJobs(period: Period) {
    this._updateSub.unsubscribe()
    this._updateSub = new Subscription()
    if (period == 0 || period == 2) {
      this._updateSubscribe() 
    }

    this._subs.add( 
      this._jobService
      .getJobList$(period)
      .subscribe((jobs: Job[]) => {
        // filter out jobs with missing models which may have no longer exist
        // this should be managed in some better way
        this._items = jobs.filter(item => {
          if (item.actor) {
            return true
          }
        })
        this.items$.next(this._items)
      })
    )
  }

  onTabClick(event): void {
    this._loadJobs(event.index)
  }

  private _updateSubscribe() {
    this._updateSub.add(
      this._jobService
      .updatedJobSubscription$()
      .subscribe((job: Job) => {

        this._items = this._items.filter((item) => {
          return (
            item.startedAt !== job.startedAt
          )
        })

        this._items.unshift(job)

        this.items$.next(this._items)
        this._cdr.detectChanges()
      })
    )
  }
}
