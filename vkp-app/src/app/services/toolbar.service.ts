import { Injectable } from '@angular/core'
import { ReplaySubject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  title = new ReplaySubject<string>()
  details = new ReplaySubject<string>()
  buttons = new ReplaySubject()
  buttonClick = new BehaviorSubject<string>('')
  options = new BehaviorSubject(true)
  export = new BehaviorSubject(false)
  exportTrigger = new BehaviorSubject(false)

  constructor() {}

  changeTitle(title: string) {
    this.title.next(title)
  }

  changeDetails(details: string) {
    this.details.next(details)
  }

  addButtons(buttons: string[]) {
    this.buttons.next(buttons)
  }

  hideOptions() {
    this.options.next(false)
  }

  showOptions() {
    this.options.next(true)
  }

}
