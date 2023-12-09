import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
@NgModule({
  declarations: [BudgetComponent, BudgetListComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class BudgetModule { }
