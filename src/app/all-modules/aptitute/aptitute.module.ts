import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { AptituteRoutingModule } from './aptitute-routing.module';
import { AptituteComponent } from './aptitute.component';
import { AptituteListComponent } from './aptitute-list/aptitute-list.component';


@NgModule({
  declarations: [AptituteComponent, AptituteListComponent],
  imports: [
    CommonModule,
    AptituteRoutingModule,
    DataTablesModule,
  ]
})
export class AptituteModule { }
