import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { PromotionMainComponent } from './promotion-main/promotion-main.component';

const routes: Routes = [
  {
    path:"",
    component:PromotionComponent,
    children:[
      {
        path:"promotionmain",
        component:PromotionMainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
