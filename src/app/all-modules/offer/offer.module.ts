import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { OfferListComponent } from './offer-list/offer-list.component';


@NgModule({
  declarations: [OfferComponent, OfferListComponent],
  imports: [
    CommonModule,
    OfferRoutingModule,
    DataTablesModule,
  ]
})
export class OfferModule { }
