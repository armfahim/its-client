import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsdashboardComponent } from './jobsdashboard.component';
import { JobsdashboardListComponent } from './jobsdashboard-list/jobsdashboard-list.component';

const routes: Routes = [
  {
    path:"",
    component:JobsdashboardComponent,
    children:[
     {
      path:"jobs-dashboard",
      component:JobsdashboardListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsdashboardRoutingModule { }
