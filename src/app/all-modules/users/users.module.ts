import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserMainComponent } from './user-main/user-main.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, UserMainComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
