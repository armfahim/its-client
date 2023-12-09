import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedjobsComponent } from './archivedjobs.component';
import { ArchivedjobsListComponent } from './archivedjobs-list/archivedjobs-list.component';

const routes: Routes = [
  {
    path:"",
    component:ArchivedjobsComponent,
    children:[
     {
      path:"archived-jobs",
      component:ArchivedjobsListComponent
     }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivedjobsRoutingModule { }
