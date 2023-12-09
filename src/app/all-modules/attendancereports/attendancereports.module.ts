import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendancereportsRoutingModule } from './attendancereports-routing.module';
import { AttendancereportsComponent } from './attendancereports.component';
import { AttendancereportsListComponent } from './attendancereports-list/attendancereports-list.component';


@NgModule({
  declarations: [AttendancereportsComponent, AttendancereportsListComponent],
  imports: [
    CommonModule,
    AttendancereportsRoutingModule
  ]
})
export class AttendancereportsModule { }
