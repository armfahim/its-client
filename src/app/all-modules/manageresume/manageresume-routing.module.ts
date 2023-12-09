import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageresumeComponent } from './manageresume.component';
import { ManageresumeListComponent } from './manageresume-list/manageresume-list.component';


const routes: Routes = [
  {
    path:"",
    component:ManageresumeComponent,
    children:[
     {
      path:"manage-resumes",
      component:ManageresumeListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageresumeRoutingModule { }
