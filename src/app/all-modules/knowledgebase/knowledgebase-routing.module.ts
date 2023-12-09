import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowledgebaseComponent } from './knowledgebase.component';
import { KnowledgebaseMainComponent } from './knowledgebase-main/knowledgebase-main.component';
import { KnowledgebaseViewComponent } from './knowledgebase-view/knowledgebase-view.component';
const routes: Routes = [
  {
    path:"",
    component:KnowledgebaseComponent,
    children:[
      {
        path:"knowledgebase-main",
        component:KnowledgebaseMainComponent
      },
      {
        path:"knowledgebase-view",
        component:KnowledgebaseViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgebaseRoutingModule { }
