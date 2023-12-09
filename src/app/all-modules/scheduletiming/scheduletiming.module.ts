import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { ScheduletimingRoutingModule } from './scheduletiming-routing.module';
import { ScheduletimingComponent } from './scheduletiming.component';
import { ScheduletimingListComponent } from './scheduletiming-list/scheduletiming-list.component';


@NgModule({
  declarations: [ScheduletimingComponent, ScheduletimingListComponent],
  imports: [
    CommonModule,
    ScheduletimingRoutingModule,
    DataTablesModule,
  ]
})
export class ScheduletimingModule { }
