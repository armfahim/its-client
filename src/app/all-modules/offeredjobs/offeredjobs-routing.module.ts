import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferedjobsComponent } from './offeredjobs.component';
import { OfferedjobsListComponent } from './offeredjobs-list/offeredjobs-list.component';

const routes: Routes = [
  {
    path:"",
    component:OfferedjobsComponent,
    children:[
     {
      path:"offered-jobs",
      component:OfferedjobsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OfferedjobsRoutingModule { }
