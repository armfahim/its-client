import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminationComponent } from './termination.component';
import { TerminationMainComponent } from './termination-main/termination-main.component';

const routes: Routes = [
  {
    path:"",
    component:TerminationComponent,
    children:[
      {
        path:"terminationmain",
        component:TerminationMainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminationRoutingModule { }
