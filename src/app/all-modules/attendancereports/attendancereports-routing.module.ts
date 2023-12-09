import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendancereportsComponent } from './attendancereports.component';
import { AttendancereportsListComponent } from './attendancereports-list/attendancereports-list.component';

const routes: Routes = [
  {
    path:"",
    component:AttendancereportsComponent,
    children:[
     {
      path:"attendance-reports",
      component:AttendancereportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendancereportsRoutingModule { }
