import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { UserdashboardComponent } from './userdashboard.component';
import { UserdashboardListComponent } from './userdashboard-list/userdashboard-list.component';
import { MorrisJsModule } from 'angular-morris-js';


@NgModule({
  declarations: [UserdashboardComponent, UserdashboardListComponent],
  imports: [
    CommonModule,
    UserdashboardRoutingModule,
    MorrisJsModule
  ]
})
export class UserdashboardModule { }
