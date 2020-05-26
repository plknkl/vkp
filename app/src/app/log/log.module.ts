import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'

import { LogPageComponent } from './log-page/log-page.component'

@NgModule({
  declarations: [LogPageComponent],
  imports: [CommonModule, MatListModule],
})
export class LogModule {}
