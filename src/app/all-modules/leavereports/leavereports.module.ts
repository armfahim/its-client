import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { LeavereportsRoutingModule } from './leavereports-routing.module';
import { LeavereportsComponent } from './leavereports.component';
import { LeavereportsListComponent } from './leavereports-list/leavereports-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [LeavereportsComponent, LeavereportsListComponent],
  imports: [
    CommonModule,
    LeavereportsRoutingModule,
     DataTablesModule,
     PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class LeavereportsModule { }
