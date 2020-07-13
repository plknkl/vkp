import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from '@angular/common/http'

import { AdministrationComponent } from './administration.component';
import { OperationEditComponent } from './operation-edit/operation-edit.component';
import { ActorEditComponent } from './actor-edit/actor-edit.component'
import { ArticleEditComponent } from './article-edit/article-edit.component'
import { ShiftEditComponent } from './shift-edit/shift-edit.component'
import { ShopEditComponent } from './shop-edit/shop-edit.component'

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdministrationComponent,
    OperationEditComponent,
    ActorEditComponent,
    ArticleEditComponent,
    ShiftEditComponent,
    ShopEditComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
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
