import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetrevenuesComponent } from './budgetrevenues.component';
import { BudgetrevenuesListComponent } from './budgetrevenues-list/budgetrevenues-list.component';


const routes: Routes = [
  {
    path:"",
    component:BudgetrevenuesComponent,
    children:[
     {
      path:"budget-revenues",
      component:BudgetrevenuesListComponent
     }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetrevenuesRoutingModule { }
