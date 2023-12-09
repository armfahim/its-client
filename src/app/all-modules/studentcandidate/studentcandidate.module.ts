import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentcandidateRoutingModule } from './studentcandidate-routing.module';
import { StudentcandidateComponent } from './studentcandidate.component';
import { StudentcandidateListComponent } from './studentcandidate-list/studentcandidate-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [StudentcandidateComponent, StudentcandidateListComponent],
  imports: [
    CommonModule,
    StudentcandidateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     DataTablesModule,
     PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class StudentcandidateModule { }
