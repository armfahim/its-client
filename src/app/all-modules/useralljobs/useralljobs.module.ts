import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UseralljobsRoutingModule } from './useralljobs-routing.module';
import { UseralljobsComponent } from './useralljobs.component';
import { UseralljobsListComponent } from './useralljobs-list/useralljobs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UseralljobsComponent, UseralljobsListComponent],
  imports: [
    CommonModule,
    UseralljobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class UseralljobsModule { }
