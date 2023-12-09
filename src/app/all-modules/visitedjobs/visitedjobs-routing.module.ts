import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitedjobsComponent } from './visitedjobs.component';
import { VisitedjobsListComponent } from './visitedjobs-list/visitedjobs-list.component';

const routes: Routes = [
  {
    path:"",
    component:VisitedjobsComponent,
    children:[
     {
      path:"visited-jobs",
      component:VisitedjobsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VisitedjobsRoutingModule { }
