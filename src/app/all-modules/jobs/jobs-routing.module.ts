import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { JobDetailsComponent } from './manage-jobs/job-details/job-details.component';
import { JobApplicantsComponent } from './manage-jobs/job-applicants/job-applicants.component';

const routes: Routes = [
  {
    path:"",
    component:JobsComponent,
    children:[
      {
        path:"manage-jobs",
        component:ManageJobsComponent
      },
      {
        path:"job-details",
        component:JobDetailsComponent
      },
      {
        path:"job-applicants",
        component:JobApplicantsComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
