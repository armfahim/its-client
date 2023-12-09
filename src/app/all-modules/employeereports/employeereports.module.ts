import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeereportsRoutingModule } from './employeereports-routing.module';
import { EmployeereportsComponent } from './employeereports.component';
import { EmployeereportsListComponent } from './employeereports-list/employeereports-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [EmployeereportsComponent, EmployeereportsListComponent],
  imports: [
    CommonModule,
    EmployeereportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class EmployeereportsModule { }
