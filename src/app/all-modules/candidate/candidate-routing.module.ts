import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';

const routes: Routes = [
  {
    path:"",
    component:CandidateComponent,
    children:[
     {
      path:"shortlist-candidates",
      component:CandidateListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CandidateRoutingModule { }
