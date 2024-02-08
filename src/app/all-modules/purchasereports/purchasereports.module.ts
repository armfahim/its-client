import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasereportsRoutingModule } from './purchasereports-routing.module';
import { PurchasereportsComponent } from './purchasereports.component';


@NgModule({
  declarations: [PurchasereportsComponent],
  imports: [
    CommonModule,
    PurchasereportsRoutingModule
  ]
})
export class PurchasereportsModule { }
