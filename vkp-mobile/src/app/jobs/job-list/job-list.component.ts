import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service'
import { JobService } from '../../services/job.service'
import { Job } from '../../models/job'
import { Subject } from 'rxjs'


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  items$: Subject<Job[]> = new Subject<Job[]>()
  displayedColumns: string[]
  private _items: Job[] = []

  constructor(
    private _toolbarService: ToolbarService,
    private _jobService: JobService,
  ) { }

  ngOnInit(): void {
    this._toolbarService.changeTitle('Jobs')
    this.displayedColumns = [
      'shift', 'actorName',
      'batchNum', 'article', 'quantity',
      'fromDate', 'toDate'
    ];

    this._jobService
      .getJobList$()
      .subscribe((jobs: Job[]) => {
        this._items = jobs
        this.items$.next(this._items)
      })
      
    this._jobService
      .updatedJobSubscription$()
      .subscribe((job: Job) => {

        if (this._items.length >= 10) {
          this._items.pop()
        }

        this._items = this._items.filter((item) => {
          return (
            item.batch.businessId !== job.batch.businessId &&
            item.startedAt !== job.startedAt
          )
        })

        this._items.unshift(job)
        this.items$.next(this._items)
      })
  }

}
