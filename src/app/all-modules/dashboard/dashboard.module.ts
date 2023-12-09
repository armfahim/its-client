import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { MorrisJsModule } from 'angular-morris-js';


@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, EmployeeDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule

  ]
})
export class DashboardModule { }
