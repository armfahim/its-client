import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [SuppliersComponent, SuppliersListComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(), 
  ]
})
export class SuppliersModule { }
