import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer.component';
import { OfferListComponent } from './offer-list/offer-list.component';

const routes: Routes = [
  {
    path:"",
    component:OfferComponent,
    children:[
     {
      path:"offer-approvals",
      component:OfferListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
