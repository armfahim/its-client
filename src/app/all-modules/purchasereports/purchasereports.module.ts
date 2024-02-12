import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasereportsRoutingModule } from './purchasereports-routing.module';
import { PurchasereportsComponent } from './purchasereports.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [PurchasereportsComponent],
  imports: [
    CommonModule,
    PurchasereportsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ]
})
export class PurchasereportsModule { }
