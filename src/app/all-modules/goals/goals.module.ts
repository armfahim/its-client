import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './goals.component';
import { GoalListComponent } from './goal-list/goal-list.component';
import { DataTablesModule } from 'angular-datatables';
import { GoalTypeComponent } from './goal-type/goal-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [GoalsComponent, GoalListComponent, GoalTypeComponent],
  imports: [
    CommonModule, FormsModule,
    GoalsRoutingModule,
    SharingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharingModule
  ]
})
export class GoalsModule { }
