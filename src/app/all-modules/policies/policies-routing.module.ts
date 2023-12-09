import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliciesComponent } from './policies.component';
import { PoliciesContentComponent } from './policies-content/policies-content.component';

const routes: Routes = [
  {
    path:"",
    component:PoliciesComponent,
    children:[
      {
        path:"policies-main",
        component:PoliciesContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
