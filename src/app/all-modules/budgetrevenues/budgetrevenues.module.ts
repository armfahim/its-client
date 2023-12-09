import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetrevenuesRoutingModule } from './budgetrevenues-routing.module';
import { BudgetrevenuesComponent } from './budgetrevenues.component';
import { BudgetrevenuesListComponent } from './budgetrevenues-list/budgetrevenues-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';


@NgModule({
  declarations: [BudgetrevenuesComponent, BudgetrevenuesListComponent],
  imports: [
    CommonModule,
    BudgetrevenuesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PickListModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
  ]
})
export class BudgetrevenuesModule { }
