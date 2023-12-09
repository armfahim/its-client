import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectContentComponent } from './project-content/project-content.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { DataTablesModule } from 'angular-datatables';
import { ProjectViewComponent } from './project-view/project-view.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ProjectsComponent, ProjectContentComponent, ProjectListComponent, ProjectViewComponent, TaskBoardComponent, TasksComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    DragDropModule,
    TooltipModule,
    ReactiveFormsModule,
  ]
})
export class ProjectsModule { }
