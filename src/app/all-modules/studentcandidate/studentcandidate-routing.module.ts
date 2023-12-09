import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentcandidateComponent } from './studentcandidate.component';
import { StudentcandidateListComponent } from './studentcandidate-list/studentcandidate-list.component';

const routes: Routes = [
  {
    path:"",
    component:StudentcandidateComponent,
    children:[
     {
      path:"candidates",
      component:StudentcandidateListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentcandidateRoutingModule { }
