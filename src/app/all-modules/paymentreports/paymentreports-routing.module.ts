import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentreportsComponent } from './paymentreports.component';
import { PaymentreportsListComponent } from './paymentreports-list/paymentreports-list.component';

const routes: Routes = [
  {
    path:"",
    component:PaymentreportsComponent,
    children:[
     {
      path:"payments-reports",
      component:PaymentreportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentreportsRoutingModule { }
