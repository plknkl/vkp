import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ActorContainerComponent } from './monitoring/actor-container/actor-container.component'
import { LoginComponent } from './login/login.component'
import { LogPageComponent } from './log/log-page/log-page.component'
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component'
import { JobListComponent } from './jobs/job-list/job-list.component'
import { AdministrationComponent } from './administration/administration.component'
import { OperationEditComponent } from './administration/operation-edit/operation-edit.component'
import { ActorEditComponent } from './administration/actor-edit/actor-edit.component'
import { ArticleEditComponent } from './administration/article-edit/article-edit.component'
import { ShiftEditComponent } from './administration/shift-edit/shift-edit.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: '', redirectTo: 'monitoring', pathMatch: 'full' },
  { path: 'monitoring', component: ActorContainerComponent, data: { list: true } },
  {
    path: 'actor/:name',
    component: ActorContainerComponent,
    data: { edit: true },
  },
  {
    path: 'log',
    component: LogPageComponent,
  },
  {
    path: 'maintenance',
    component: MaintenanceListComponent,
  },
  {
    path: 'jobs',
    component: JobListComponent,
  },
  // administration
  {
    path: 'administration/operation/:name',
    component: OperationEditComponent,
  },
  {
    path: 'administration/actor/:name',
    component: ActorEditComponent,
  },
  {
    path: 'administration/article/:article',
    component: ArticleEditComponent,
  },
  {
    path: 'administration/shift/:shift',
    component: ShiftEditComponent,
  },
  {
    path: 'administration/:any',
    component: AdministrationComponent
  },
  {
    path: 'administration',
    component: AdministrationComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
