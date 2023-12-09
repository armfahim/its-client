import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivedjobsRoutingModule } from './archivedjobs-routing.module';
import { ArchivedjobsComponent } from './archivedjobs.component';
import { ArchivedjobsListComponent } from './archivedjobs-list/archivedjobs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ArchivedjobsComponent, ArchivedjobsListComponent],
  imports: [
    CommonModule,
    ArchivedjobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
    
  ]
})
export class ArchivedjobsModule { }
