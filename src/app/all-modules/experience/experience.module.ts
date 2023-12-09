import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceComponent } from './experience.component';
import { ExperienceListComponent } from './experience-list/experience-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExperienceComponent, ExperienceListComponent],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     DataTablesModule
  ]
})
export class ExperienceModule { }
