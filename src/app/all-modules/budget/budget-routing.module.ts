import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget.component';
import { BudgetListComponent } from './budget-list/budget-list.component';

const routes: Routes = [
  {
    path:"",
    component:BudgetComponent,
    children:[
     {
      path:"budgets",
      component:BudgetListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BudgetRoutingModule { }
