import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { DataTablesModule } from 'angular-datatables';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainingTypeComponent } from './training-type/training-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [TrainingComponent, TrainingListComponent, TrainersComponent, TrainingTypeComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharingModule,
    ReactiveFormsModule,
    TrainingRoutingModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    SharingModule
  ]
})
export class TrainingModule { }
