import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatTableModule } from '@angular/material/table'

import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component'

@NgModule({
  declarations: [MaintenanceListComponent],
  imports: [
    CommonModule,
    MatTableModule,
  ],
})
export class MaintenanceModule {}
