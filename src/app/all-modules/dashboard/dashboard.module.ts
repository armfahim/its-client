import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MorrisJsModule } from 'angular-morris-js';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, EmployeeDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MorrisJsModule,
    NgSelectModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgHttpLoaderModule.forRoot(), 

  ]
})
export class DashboardModule { }
