import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyreportsComponent } from './dailyreports.component';
import { DailyreportsListComponent } from './dailyreports-list/dailyreports-list.component';

const routes: Routes = [
  {
    path:"",
    component:DailyreportsComponent,
    children:[
     {
      path:"daily-reports",
      component:DailyreportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DailyreportsRoutingModule { }
