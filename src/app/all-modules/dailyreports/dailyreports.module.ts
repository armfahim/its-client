import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyreportsRoutingModule } from './dailyreports-routing.module';
import { DailyreportsComponent } from './dailyreports.component';
import { DailyreportsListComponent } from './dailyreports-list/dailyreports-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [DailyreportsComponent, DailyreportsListComponent],
  imports: [
    CommonModule,
    DailyreportsRoutingModule,
     ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class DailyreportsModule { }
