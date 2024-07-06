import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperworksRoutingModule } from './paperworks-routing.module';
import { PaperworksComponent } from './paperworks.component';
import { PaperworksListComponent } from './paperworks-list/paperworks-list.component';
import { PaperworksAddComponent } from './paperworks-add/paperworks-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [PaperworksComponent, PaperworksListComponent, PaperworksAddComponent],
  imports: [
    CommonModule,
    PaperworksRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class PaperworksModule { }
