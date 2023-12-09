import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { DataTablesModule } from 'angular-datatables';
import { JobDetailsComponent } from './manage-jobs/job-details/job-details.component';
import { JobApplicantsComponent } from './manage-jobs/job-applicants/job-applicants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [JobsComponent, ManageJobsComponent, JobDetailsComponent, JobApplicantsComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    DataTablesModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharingModule
  ]
})
export class JobsModule { }
