import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedjobsComponent } from './savedjobs.component';
import { SavedjobsListComponent } from './savedjobs-list/savedjobs-list.component';

const routes: Routes = [
  {
    path:"",
    component:SavedjobsComponent,
    children:[
     {
      path:"saved-jobs",
      component:SavedjobsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SavedjobsRoutingModule { }
