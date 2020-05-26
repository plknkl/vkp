import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'

import { MatTableModule } from '@angular/material/table'

import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component'

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [MaintenanceListComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    MatTableModule,
  ],
})
export class MaintenanceModule {}
