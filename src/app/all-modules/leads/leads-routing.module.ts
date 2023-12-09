import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadsComponent } from './leads.component';
import { LeadsContentComponent } from './leads-content/leads-content.component';

const routes: Routes = [
  {
    path:"",
    component:LeadsComponent,
    children:[
      {
        path:"leadscontent",
        component:LeadsContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
