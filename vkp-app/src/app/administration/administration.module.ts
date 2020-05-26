import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'

import { MatListModule } from '@angular/material/list'

import { AdministrationComponent } from './administration.component';
import { OperationEditComponent } from './operation-edit/operation-edit.component';
import { ActorEditComponent } from './actor-edit/actor-edit.component'
import { ArticleEditComponent } from './article-edit/article-edit.component'
import { ShiftEditComponent } from './shift-edit/shift-edit.component'

@NgModule({
  declarations: [
    AdministrationComponent,
    OperationEditComponent,
    ActorEditComponent,
    ArticleEditComponent,
    ShiftEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSelectModule
  ],
})
export class AdministrationModule {}
