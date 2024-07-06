import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaperworksComponent } from './paperworks.component';
import { PaperworksListComponent } from './paperworks-list/paperworks-list.component';
import { PaperworksAddComponent } from './paperworks-add/paperworks-add.component';

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
