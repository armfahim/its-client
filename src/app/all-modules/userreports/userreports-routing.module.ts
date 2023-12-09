import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserreportsComponent } from './userreports.component';
import { UserreportsListComponent } from './userreports-list/userreports-list.component';

const routes: Routes = [
  {
    path:"",
    component:UserreportsComponent,
    children:[
     {
      path:"user-reports",
      component:UserreportsListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserreportsRoutingModule { }
