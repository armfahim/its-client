import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './leads.component';
import { LeadsContentComponent } from './leads-content/leads-content.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [LeadsComponent, LeadsContentComponent],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    DataTablesModule
  ]
})
export class LeadsModule { }
