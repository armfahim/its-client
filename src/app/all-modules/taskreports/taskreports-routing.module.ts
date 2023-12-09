import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskreportsComponent } from './taskreports.component';
import { TaskreportsListComponent } from './taskreports-list/taskreports-list.component';

const routes: Routes = [
  {
    path:"",
    component:TaskreportsComponent,
    children:[
     {
      path:"task-reports",
      component:TaskreportsListComponent
     }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskreportsRoutingModule { }
