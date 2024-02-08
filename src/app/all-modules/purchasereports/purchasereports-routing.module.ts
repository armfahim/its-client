import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasereportsComponent } from './purchasereports.component';

const routes: Routes = [
  {
    path: '',
    component: PurchasereportsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasereportsRoutingModule { }
