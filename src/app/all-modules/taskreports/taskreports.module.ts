import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskreportsRoutingModule } from './taskreports-routing.module';
import { TaskreportsComponent } from './taskreports.component';
import { TaskreportsListComponent } from './taskreports-list/taskreports-list.component';


@NgModule({
  declarations: [TaskreportsComponent, TaskreportsListComponent],
  imports: [
    CommonModule,
    TaskreportsRoutingModule
  ]
})
export class TaskreportsModule { }
