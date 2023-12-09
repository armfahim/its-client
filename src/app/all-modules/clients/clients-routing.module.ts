import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientsContentPageComponent } from './clients-content-page/clients-content-page.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsProfileComponent } from './clients-profile/clients-profile.component';
const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'clientspage',
        component: ClientsContentPageComponent
      },
      {
        path: 'clientslist',
        component: ClientsListComponent
      },
      {
        path: 'clientsprofile/:id',
        component: ClientsProfileComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
