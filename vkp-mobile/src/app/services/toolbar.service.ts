import { Injectable } from '@angular/core'
import { ReplaySubject, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  title = new ReplaySubject()
  details = new ReplaySubject()
  buttons = new ReplaySubject()
  buttonClick = new BehaviorSubject<string>('')
  options = new BehaviorSubject(true)

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
