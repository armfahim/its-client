import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsdashboardRoutingModule } from './jobsdashboard-routing.module';
import { JobsdashboardComponent } from './jobsdashboard.component';
import { JobsdashboardListComponent } from './jobsdashboard-list/jobsdashboard-list.component';
import { MorrisJsModule } from 'angular-morris-js';


@NgModule({
  declarations: [JobsdashboardComponent, JobsdashboardListComponent],
  imports: [
    CommonModule,
    JobsdashboardRoutingModule,
    MorrisJsModule
  ]
})
export class JobsdashboardModule { }
