import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';

const routes: Routes = [
  {
    path:"error404",
    component:Error404Component
  },
  {
    path:"error500",
    component:Error500Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorpagesRoutingModule { }
