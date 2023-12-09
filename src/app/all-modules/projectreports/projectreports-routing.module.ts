import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectreportsComponent } from './projectreports.component';
import { ProjectreportsListComponent } from './projectreports-list/projectreports-list.component';

const routes: Routes = [
  {
    path:"",
    component:ProjectreportsComponent,
    children:[
     {
      path:"project-reports",
      component:ProjectreportsListComponent
     }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectreportsRoutingModule { }
