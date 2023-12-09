import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { DataTablesModule } from 'angular-datatables';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PayrollComponent, EmployeeSalaryComponent, SalaryViewComponent, PayrollItemsComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
    ReactiveFormsModule
  ]
})
export class PayrollModule { }
