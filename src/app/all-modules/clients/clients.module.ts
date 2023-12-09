import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { DataTablesModule } from 'angular-datatables';

import { ClientsComponent } from './clients.component';
import { ClientsContentPageComponent } from './clients-content-page/clients-content-page.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsProfileComponent } from './clients-profile/clients-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ClientsComponent, ClientsContentPageComponent, ClientsListComponent, ClientsProfileComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
