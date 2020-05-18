import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'

import { JobListComponent } from './job-list/job-list.component';


@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class JobsModule { }
