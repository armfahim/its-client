import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { ComponentMainComponent } from './component-main/component-main.component';

@NgModule({
  declarations: [ComponentsComponent, ComponentMainComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
