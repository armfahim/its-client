import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferedjobsRoutingModule } from './offeredjobs-routing.module';
import { OfferedjobsComponent } from './offeredjobs.component';
import { OfferedjobsListComponent } from './offeredjobs-list/offeredjobs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OfferedjobsComponent, OfferedjobsListComponent],
  imports: [
    CommonModule,
    OfferedjobsRoutingModule,
     ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})

export class OfferedjobsModule { }
