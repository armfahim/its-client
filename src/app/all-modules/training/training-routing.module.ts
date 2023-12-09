import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainingTypeComponent } from './training-type/training-type.component';

const routes: Routes = [
  {
    path:"",
    component:TrainingComponent,
    children:[
      {
        path:"traininglist",
        component:TrainingListComponent
      },
      {
        path:"trainers",
        component:TrainersComponent
      },
      {
        path:"trainingtype",
        component:TrainingTypeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
