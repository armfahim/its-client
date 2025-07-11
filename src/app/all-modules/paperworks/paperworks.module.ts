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
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { PaperworksViewComponent } from './paperworks-view/paperworks-view.component';


@NgModule({
  declarations: [PaperworksComponent, PaperworksListComponent, PaperworksAddComponent, PaperworksViewComponent],
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
