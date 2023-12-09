import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { ComponentMainComponent } from './component-main/component-main.component';

const routes: Routes = [
  {
    path:"",
    component:ComponentsComponent,
    children:[
      {
        path:"component-main",
        component:ComponentMainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
