import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceComponent } from './performance.component';
import { PerformanceIndicatorComponent } from './performance-indicator/performance-indicator.component';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';
import { PerformanceAppraisalComponent } from './performance-appraisal/performance-appraisal.component';
const routes: Routes = [
  {
    path: "",
    component: PerformanceComponent,
    children: [
      {
        path: "performanceindicator",
        component: PerformanceIndicatorComponent
      },
      {
        path: "performancereview",
        component: PerformanceReviewComponent
      },
      {
        path: "performanceappraisal",
        component: PerformanceAppraisalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
