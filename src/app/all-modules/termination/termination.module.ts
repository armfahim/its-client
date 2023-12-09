import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminationRoutingModule } from './termination-routing.module';
import { TerminationComponent } from './termination.component';
import { TerminationMainComponent } from './termination-main/termination-main.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [TerminationComponent, TerminationMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharingModule,
    ReactiveFormsModule,
    TerminationRoutingModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    SharingModule
  ]
})
export class TerminationModule { }
