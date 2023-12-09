import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewingComponent } from './interviewing.component';
import { InterviewingListComponent } from './interviewing-list/interviewing-list.component';

const routes: Routes = [
  {
    path:"",
    component:InterviewingComponent,
    children:[
     {
      path:"interviewing",
      component:InterviewingListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InterviewingRoutingModule { }
