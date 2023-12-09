import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { BasicInputsComponent } from './basic-inputs/basic-inputs.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { HorizontalFormComponent } from './horizontal-form/horizontal-form.component';
import { FormMaskComponent } from './form-mask/form-mask.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { VerticalsFormsNewComponent } from './verticals-forms-new/verticals-forms-new.component';

const routes: Routes = [
  {
    path:"",
    component:FormsComponent,
    children:[
      {
        path:"basic-inputs",
        component:BasicInputsComponent
      },
      {
        path:"input-groups",
        component:InputGroupsComponent
      },
      {
        path:"horizontal-form",
        component:HorizontalFormComponent
      },
      {
        path:"vertical-form",
        component:VerticalsFormsNewComponent
      },
      {
        path:"form-mask",
        component:FormMaskComponent
      },
      {
        path:"form-validation",
        component:FormValidationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
