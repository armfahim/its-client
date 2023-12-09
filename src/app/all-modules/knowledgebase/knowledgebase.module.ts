import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgebaseRoutingModule } from './knowledgebase-routing.module';
import { KnowledgebaseComponent } from './knowledgebase.component';
import { KnowledgebaseMainComponent } from './knowledgebase-main/knowledgebase-main.component';
import { KnowledgebaseViewComponent } from './knowledgebase-view/knowledgebase-view.component';

@NgModule({
  declarations: [KnowledgebaseComponent, KnowledgebaseMainComponent, KnowledgebaseViewComponent],
  imports: [
    CommonModule,
    KnowledgebaseRoutingModule
  ]
})
export class KnowledgebaseModule { }
