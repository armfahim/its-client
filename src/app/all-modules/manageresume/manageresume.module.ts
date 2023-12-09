import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageresumeRoutingModule } from './manageresume-routing.module';
import { ManageresumeComponent } from './manageresume.component';
import { ManageresumeListComponent } from './manageresume-list/manageresume-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';


@NgModule({
  declarations: [ManageresumeComponent, ManageresumeListComponent],
  imports: [
    CommonModule,
    ManageresumeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     DataTablesModule,
      PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class ManageresumeModule { }
