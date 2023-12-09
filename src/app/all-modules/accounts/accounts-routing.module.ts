import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { EstimatesComponent } from './estimates/estimates.component';
import { EstimatesViewComponent } from './estimates/estimates-view/estimates-view.component';
import { CreateEstimatesComponent } from './estimates/create-estimates/create-estimates.component';
import { EditEstimateComponent } from './estimates/edit-estimate/edit-estimate.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceViewComponent } from './invoices/invoice-view/invoice-view.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { EditInvoiceComponent } from './invoices/edit-invoice/edit-invoice.component';
import { PaymentsComponent } from './payments/payments.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ProvidentFundComponent } from './provident-fund/provident-fund.component';
import { TaxesComponent } from './taxes/taxes.component';


const routes: Routes = [
  {
    path:"",
    component:AccountsComponent,
    children:[
      {
        path:"estimates",
        component:EstimatesComponent
      },
      
      {
        path:"estimates-view",
        component:EstimatesViewComponent
      },
      {
        path:"create-estimates",
        component:CreateEstimatesComponent
      },
      {
        path:"edit-estimates",
        component:EditEstimateComponent
      },
      {
        path:"invoices",
        component:InvoicesComponent
      },
      {
        path:"invoice-view",
        component:InvoiceViewComponent
      },
      {
        path:"create-invoice",
        component:CreateInvoiceComponent
      },
      {
        path:"edit-invoice",
        component:EditInvoiceComponent
      },
      {
        path:"payments",
        component:PaymentsComponent
      },
      {
        path:"expenses",
        component:ExpensesComponent
      },
      {
        path:"provident-fund",
        component:ProvidentFundComponent
      },
      {
        path:"taxes",
        component:TaxesComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
