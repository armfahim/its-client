import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayslipreportsComponent } from './payslipreports.component';
import { PayslipreportsListComponent } from './payslipreports-list/payslipreports-list.component';

const routes: Routes = [
  {
    path:"",
    component:PayslipreportsComponent,
    children:[
     {
      path:"payslip-reports",
      component:PayslipreportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayslipreportsRoutingModule { }
