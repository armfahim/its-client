import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavereportsComponent } from './leavereports.component';
import { LeavereportsListComponent } from './leavereports-list/leavereports-list.component';

const routes: Routes = [
  {
    path:"",
    component:LeavereportsComponent,
    children:[
     {
      path:"leave-reports",
      component:LeavereportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavereportsRoutingModule { }
