import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitedjobsRoutingModule } from './visitedjobs-routing.module';
import { VisitedjobsComponent } from './visitedjobs.component';
import { VisitedjobsListComponent } from './visitedjobs-list/visitedjobs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [VisitedjobsComponent, VisitedjobsListComponent],
  imports: [
    CommonModule,
    VisitedjobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    DataTablesModule
  ]
})
export class VisitedjobsModule { }
