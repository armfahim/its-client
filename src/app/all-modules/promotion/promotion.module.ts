import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { PromotionMainComponent } from './promotion-main/promotion-main.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [PromotionComponent, PromotionMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharingModule,
    PromotionRoutingModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    SharingModule
  ]
})
export class PromotionModule { }
