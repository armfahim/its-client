import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaperworksComponent } from './paperworks.component';
import { PaperworksListComponent } from './paperworks-list/paperworks-list.component';
import { PaperworksAddComponent } from './paperworks-add/paperworks-add.component';
import { PaperworksViewComponent } from './paperworks-view/paperworks-view.component';

const routes: Routes = [
  {
    path: '',
    component: PaperworksComponent,
    children: [
      {
        path: 'paperwork-list',
        component: PaperworksListComponent
      },
      {
        path: 'add-paperwork',
        component: PaperworksAddComponent
      },
      {
        path:"add-paperwork/:id",
        component:PaperworksAddComponent
      },
      {
        path: 'view-paperwork',
        component: PaperworksViewComponent
      },
      {
        path: 'view-paperwork/:id',
        component: PaperworksViewComponent
      },
      // {
      //   path: 'view-invoice/:id',
      //   component: InvoiceViewComponent
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaperworksRoutingModule { }
