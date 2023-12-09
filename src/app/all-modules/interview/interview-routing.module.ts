import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewComponent } from './interview.component';
import { InterviewListComponent } from './interview-list/interview-list.component';

const routes: Routes = [
  {
    path:"",
    component:InterviewComponent,
    children:[
     {
      path:"interview-questions",
      component:InterviewListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
