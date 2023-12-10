import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';

const routes: Routes = [
  {
    path: '',
    component: SuppliersComponent,
    children: [
      // {
      //   path: 'clientspage',
      //   component: ClientsContentPageComponent
      // },
      {
        path: 'supplierslist',
        component: SuppliersListComponent
      },
      // {
      //   path: 'clientsprofile/:id',
      //   component: ClientsProfileComponent
      // },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
