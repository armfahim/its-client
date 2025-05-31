import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopBranchComponent } from './shop-branch.component';
import { ShopBranchListComponent } from './shop-branch-list/shop-branch-list.component';

const routes: Routes = [
  {
      path: '',
      component: ShopBranchComponent,
      children: [
        {
          path: 'shop/branches',
          component: ShopBranchListComponent
        },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopBranchRoutingModule { }
