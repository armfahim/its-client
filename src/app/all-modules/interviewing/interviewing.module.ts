import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewingRoutingModule } from './interviewing-routing.module';
import { InterviewingComponent } from './interviewing.component';
import { InterviewingListComponent } from './interviewing-list/interviewing-list.component';


@NgModule({
  declarations: [InterviewingComponent, InterviewingListComponent],
  imports: [
    CommonModule,
    InterviewingRoutingModule
  ]
})
export class InterviewingModule { }
