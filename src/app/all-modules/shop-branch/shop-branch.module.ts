import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopBranchRoutingModule } from './shop-branch-routing.module';
import { ShopBranchComponent } from './shop-branch.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ShopBranchListComponent } from './shop-branch-list/shop-branch-list.component';


@NgModule({
  declarations: [ShopBranchComponent, ShopBranchListComponent],
  imports: [
    CommonModule,
    ShopBranchRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(), 
  ]
})
export class ShopBranchModule { }
