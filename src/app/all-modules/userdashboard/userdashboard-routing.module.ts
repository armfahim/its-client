import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdashboardComponent } from './userdashboard.component';
import { UserdashboardListComponent } from './userdashboard-list/userdashboard-list.component';

const routes: Routes = [
  {
    path:"",
    component:UserdashboardComponent,
    children:[
     {
      path:"user-dashboard",
      component:UserdashboardListComponent
     }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdashboardRoutingModule { }
