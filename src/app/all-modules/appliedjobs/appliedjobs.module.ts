import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppliedjobsRoutingModule } from './appliedjobs-routing.module';
import { AppliedjobsComponent } from './appliedjobs.component';
import { AppliedjobsListComponent } from './appliedjobs-list/appliedjobs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppliedjobsComponent, AppliedjobsListComponent],
  imports: [
    CommonModule,
    AppliedjobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class AppliedjobsModule { }
