
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayslipreportsRoutingModule } from './payslipreports-routing.module';
import { PayslipreportsComponent } from './payslipreports.component';
import { PayslipreportsListComponent } from './payslipreports-list/payslipreports-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PayslipreportsComponent, PayslipreportsListComponent],
  imports: [
    CommonModule,
    PayslipreportsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    DataTablesModule
  ]
})
export class PayslipreportsModule { }
