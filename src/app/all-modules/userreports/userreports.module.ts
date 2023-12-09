import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserreportsRoutingModule } from './userreports-routing.module';
import { UserreportsComponent } from './userreports.component';
import { UserreportsListComponent } from './userreports-list/userreports-list.component';


@NgModule({
  declarations: [UserreportsComponent, UserreportsListComponent],
  imports: [
    CommonModule,
    UserreportsRoutingModule
  ]
})
export class UserreportsModule { }
