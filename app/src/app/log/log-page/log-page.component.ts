import { Component, OnInit, OnDestroy } from '@angular/core'
import { LogService } from '../../services/log.service'
import { ToolbarService } from '../../services/toolbar.service'
import { Subscription } from 'rxjs'
import { Log } from '../../models/log'

interface ParsedLog {
  message: string,
  log: Log
}

@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.scss'],
})
export class LogPageComponent implements OnInit, OnDestroy {
  items: ParsedLog[] = []
  private _logCreatedSubscription: Subscription
  private _logListSubscription: Subscription


  constructor(private _logService: LogService, private _toolbarService: ToolbarService) {}

  ngOnInit(): void {
    this._toolbarService.changeTitle('log')

    this._logListSubscription = this._logService
      .getLogList$()
      .subscribe((logs: Log[]) => {
        this.items = logs.map(log => this._parseLog(log))
      })

    this._logCreatedSubscription = this._logService
      .createdLogSubscription$()
      .subscribe((log: Log) => {
        if (this.items.length >= 10) {
          this.items.pop()
        }
        this.items.unshift(this._parseLog(log))
      })
  }

  private _parseLog(log: Log): ParsedLog {
    let message = ''
    if (log.entity.__typename == 'Actor') {
      message = `${log.entity.name} - ${log.status}`
    }

    if (log.entity.__typename == 'Job') {
      message = `${log.entity.actor.operation.name}
        - ${log.status}
      `
    }

    return {
      message,
      log
    }
  }

  ngOnDestroy(): void {
    this._logCreatedSubscription.unsubscribe()
    this._logListSubscription.unsubscribe()
  }
}
