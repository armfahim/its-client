import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduletimingComponent } from './scheduletiming.component';
import { ScheduletimingListComponent } from './scheduletiming-list/scheduletiming-list.component';

const routes: Routes = [
  {
    path:"",
    component:ScheduletimingComponent,
    children:[
     {
      path:"schedule-timing",
      component:ScheduletimingListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScheduletimingRoutingModule { }
