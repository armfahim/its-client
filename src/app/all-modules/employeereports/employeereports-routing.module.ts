import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeereportsComponent } from './employeereports.component';
import { EmployeereportsListComponent } from './employeereports-list/employeereports-list.component';

const routes: Routes = [
  {
    path:"",
    component:EmployeereportsComponent,
    children:[
     {
      path:"employee-reports",
      component:EmployeereportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeereportsRoutingModule { }
