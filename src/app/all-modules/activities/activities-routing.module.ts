import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesMainComponent } from './activities-main/activities-main.component';


const routes: Routes = [
  {
    path:"",
    component:ActivitiesComponent,
    children:[
     {
      path:"activities-main",
      component:ActivitiesMainComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
