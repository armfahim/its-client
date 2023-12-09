import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingComponent } from './scheduling.component';
import { ShiftSchedulingComponent } from './shift-scheduling/shift-scheduling.component';

const routes: Routes = [
  {
    path:"",
    component:SchedulingComponent,
    children:[
     {
      path:"shift-scheduling",
      component:ShiftSchedulingComponent
     }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingRoutingModule { }
