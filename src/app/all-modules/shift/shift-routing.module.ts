import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftComponent } from './shift.component';
import { ShiftListComponent } from './shift-list/shift-list.component';

const routes: Routes = [
  {
    path:"",
    component:ShiftComponent,
    children:[
     {
      path:"shift-list",
      component:ShiftListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
