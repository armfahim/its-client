import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseralljobsComponent } from './useralljobs.component';
import { UseralljobsListComponent } from './useralljobs-list/useralljobs-list.component';

const routes: Routes = [
  {
    path:"",
    component:UseralljobsComponent,
    children:[
     {
      path:"user-all-jobs",
      component:UseralljobsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseralljobsRoutingModule { }
