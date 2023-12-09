import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftComponent } from './shift.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
@NgModule({
  declarations: [ShiftComponent, ShiftListComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
     ReactiveFormsModule,
    FormsModule,
      DataTablesModule,
      PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class ShiftModule { }
