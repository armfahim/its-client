import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module';
import { InterviewComponent } from './interview.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InterviewComponent, InterviewListComponent],
  imports: [
    CommonModule,
    InterviewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     DataTablesModule
  ]
})
export class InterviewModule { }
