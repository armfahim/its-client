import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { PaymentreportsRoutingModule } from './paymentreports-routing.module';
import { PaymentreportsComponent } from './paymentreports.component';
import { PaymentreportsListComponent } from './paymentreports-list/paymentreports-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [PaymentreportsComponent, PaymentreportsListComponent],
  imports: [
    CommonModule,
    PaymentreportsRoutingModule,
    DataTablesModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class PaymentreportsModule { }
