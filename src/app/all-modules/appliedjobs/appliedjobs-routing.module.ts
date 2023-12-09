import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppliedjobsComponent } from './appliedjobs.component';
import { AppliedjobsListComponent } from './appliedjobs-list/appliedjobs-list.component';

const routes: Routes = [
  {
    path:"",
    component:AppliedjobsComponent,
    children:[
     {
      path:"applied-jobs",
      component:AppliedjobsListComponent
     }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppliedjobsRoutingModule { }
