import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetexpensesComponent } from './budgetexpenses.component';
import { BudgetexpensesListComponent } from './budgetexpenses-list/budgetexpenses-list.component';

const routes: Routes = [
  {
    path:"",
    component:BudgetexpensesComponent,
    children:[
     {
      path:"budget-expenses",
      component:BudgetexpensesListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetexpensesRoutingModule { }
