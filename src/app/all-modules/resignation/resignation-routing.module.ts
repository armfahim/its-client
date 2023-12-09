import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResignationComponent } from './resignation.component';
import { ResignationMainComponent } from './resignation-main/resignation-main.component';

const routes: Routes = [
  {
    path:"",
    component:ResignationComponent,
    children:[
      {
        path:"resignationmain",
        component:ResignationMainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResignationRoutingModule { }
