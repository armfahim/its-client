import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
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
import { DataTablesModule } from 'angular-datatables';
import { ExpensesComponent } from './expenses/expenses.component';
import { ProvidentFundComponent } from './provident-fund/provident-fund.component';
import { TaxesComponent } from './taxes/taxes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';

@NgModule({
  declarations: [AccountsComponent, EstimatesComponent, EstimatesViewComponent, CreateEstimatesComponent, EditEstimateComponent, InvoicesComponent, InvoiceViewComponent, CreateInvoiceComponent, EditInvoiceComponent, PaymentsComponent, ExpensesComponent, ProvidentFundComponent, TaxesComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    SharingModule
  ]
})
export class AccountsModule { }
