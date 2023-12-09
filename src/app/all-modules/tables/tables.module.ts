import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { BasicTablesComponent } from './basic-tables/basic-tables.component';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [TablesComponent, BasicTablesComponent, DataTablesComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    DataTablesModule
  ]
})
export class TablesModule { }
