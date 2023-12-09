import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { BasicInputsComponent } from './basic-inputs/basic-inputs.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { HorizontalFormComponent } from './horizontal-form/horizontal-form.component';
import { FormMaskComponent } from './form-mask/form-mask.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { VerticalsFormsNewComponent } from './verticals-forms-new/verticals-forms-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  declarations: [FormsComponent, BasicInputsComponent, InputGroupsComponent, HorizontalFormComponent, FormMaskComponent, FormValidationComponent, VerticalsFormsNewComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
      // clearIfNotMatch : true
    }) 
  ]
})
export class FormsModule { }
