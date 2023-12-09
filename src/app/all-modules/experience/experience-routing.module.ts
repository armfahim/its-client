import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceComponent } from './experience.component';
import { ExperienceListComponent } from './experience-list/experience-list.component';

const routes: Routes = [
  {
    path:"",
    component:ExperienceComponent,
    children:[
     {
      path:"experience-level",
      component:ExperienceListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule { }
