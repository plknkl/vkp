import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ActorEditComponent } from './actor-edit/actor-edit.component'
import { ActorListComponent } from './actor-list/actor-list.component'
import { ActorContainerComponent } from './actor-container/actor-container.component'
import { NewJobDialogComponent } from './new-job-dialog/new-job-dialog.component'
import { FinishJobDialogComponent } from './finish-job-dialog/finish-job-dialog.component'

@NgModule({
  declarations: [
    ActorEditComponent,
    ActorListComponent,
    ActorContainerComponent,
    NewJobDialogComponent,
    FinishJobDialogComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class MonitoringModule {}
