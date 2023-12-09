import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulingRoutingModule } from './scheduling-routing.module';
import { SchedulingComponent } from './scheduling.component';
import { ShiftSchedulingComponent } from './shift-scheduling/shift-scheduling.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';


@NgModule({
  declarations: [SchedulingComponent, ShiftSchedulingComponent],
  imports: [
    CommonModule,
    SchedulingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class SchedulingModule { }
