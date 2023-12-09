import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { EditInvoiceReportComponent } from './edit-invoice-report/edit-invoice-report.component';
const routes: Routes = [
  {
    path:"",
    component:ReportsComponent,
    children:[
      {
        path:"expense-report",
        component:ExpenseReportComponent
      },
      {
        path:"invoice-report",
        component:InvoiceReportComponent
      },
      {
        path:"edit-invoice-report",
        component:EditInvoiceReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
