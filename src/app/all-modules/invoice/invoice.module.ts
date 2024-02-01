import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TwoDigitDecimaNumberDirective } from 'src/app/utils/two-digit-decima-number.directive';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';


@NgModule({
  declarations: [InvoiceComponent, InvoiceListComponent,TwoDigitDecimaNumberDirective, InvoiceViewComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class InvoiceModule { }
