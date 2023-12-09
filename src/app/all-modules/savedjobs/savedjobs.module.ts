import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedjobsRoutingModule } from './savedjobs-routing.module';
import { SavedjobsComponent } from './savedjobs.component';
import { SavedjobsListComponent } from './savedjobs-list/savedjobs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SavedjobsComponent, SavedjobsListComponent],
  imports: [
    CommonModule,
    SavedjobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class SavedjobsModule { }
