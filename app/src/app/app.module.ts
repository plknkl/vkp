import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { ServiceWorkerModule } from '@angular/service-worker'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '../environments/environment'

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
// import { WebSocketLink } from 'apollo-link-ws'

import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';


import { MonitoringModule } from './monitoring/monitoring.module'
import { ToolbarModule } from './toolbar/toolbar.module'
import { LogModule } from './log/log.module'
import { AdministrationModule } from './administration/administration.module'
import { MaintenanceModule } from './maintenance/maintenance.module'
import { JobsModule } from './jobs/jobs.module';
import { LoginComponent } from './login/login.component';
import { ErrorPopUpComponent } from './error-pop-up/error-pop-up.component'

import { link } from './constants/api-url'

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [AppComponent, LoginComponent, ErrorPopUpComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    }),
    ToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MonitoringModule,
    ToolbarModule,
    LogModule,
    AdministrationModule,
    MaintenanceModule,
    JobsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return new ApolloClient({
          cache: new InMemoryCache(),
//          link: new WebSocketLink({
//            uri: environment.baseUrl,
//            reconnect: true,
//          }),
          link: link,
          defaultOptions: {
            query: {
              fetchPolicy: 'no-cache',
            },
          },
        })
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
