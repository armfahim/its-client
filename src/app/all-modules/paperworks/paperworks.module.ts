import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperworksRoutingModule } from './paperworks-routing.module';
import { PaperworksComponent } from './paperworks.component';
import { PaperworksListComponent } from './paperworks-list/paperworks-list.component';
import { PaperworksAddComponent } from './paperworks-add/paperworks-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DataTablesModule } from 'angular-datatables';
import { TwoDigitDecimaNumberDirective } from 'src/app/utils/two-digit-decima-number.directive';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [PaperworksComponent, PaperworksListComponent, PaperworksAddComponent, TwoDigitDecimaNumberDirective],
  imports: [
    CommonModule,
    PaperworksRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgHttpLoaderModule.forRoot(), 
    CalendarModule
  ]
})
export class PaperworksModule { }
