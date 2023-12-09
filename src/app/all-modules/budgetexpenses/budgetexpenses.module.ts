import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetexpensesRoutingModule } from './budgetexpenses-routing.module';
import { BudgetexpensesComponent } from './budgetexpenses.component';
import { BudgetexpensesListComponent } from './budgetexpenses-list/budgetexpenses-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [BudgetexpensesComponent, BudgetexpensesListComponent],
  imports: [
    CommonModule,
    BudgetexpensesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class BudgetexpensesModule { }
