import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceComponent } from './performance.component';
import { PerformanceIndicatorComponent } from './performance-indicator/performance-indicator.component';
import { DataTablesModule } from 'angular-datatables';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';
import { PerformanceAppraisalComponent } from './performance-appraisal/performance-appraisal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [PerformanceComponent, PerformanceIndicatorComponent, PerformanceReviewComponent, PerformanceAppraisalComponent],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    SharingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PerformanceModule { }
