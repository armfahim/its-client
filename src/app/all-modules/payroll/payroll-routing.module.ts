import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
const routes: Routes = [
  {
    path:"",
    component:PayrollComponent,
    children:[
      {
        path:"employee-salary",
        component:EmployeeSalaryComponent
      },
      {
        path:"salary-view",
        component:SalaryViewComponent
      },
      {
        path:"payroll-items",
        component:PayrollItemsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
