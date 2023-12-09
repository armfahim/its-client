import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AptituteComponent } from './aptitute.component';
import { AptituteListComponent } from './aptitute-list/aptitute-list.component';

const routes: Routes = [
  {
    path:"",
    component:AptituteComponent,
    children:[
     {
      path:"aptitute-result",
      component:AptituteListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AptituteRoutingModule { }
