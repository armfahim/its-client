import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketsContentComponent } from './tickets-content/tickets-content.component';
import { TicketsViewComponent } from './tickets-view/tickets-view.component';


const routes: Routes = [
  {
    path:"",
    component:TicketsComponent,
    children:[
      {
        path:"ticketscontent",
        component:TicketsContentComponent
      },
      {
        path:"ticketsview",
        component:TicketsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
