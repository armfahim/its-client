import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AllModulesRoutingModule } from './all-modules-routing.module';
import { AllModulesComponent } from './all-modules.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

// Api Interaction
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api'

// Perfect Scrollbar
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { HeaderService } from '../header/header.service';
import { AllModulesService } from './all-modules.service';

// Api All Modules Database
import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';
import { NgHttpLoaderModule } from 'ng-http-loader';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    AllModulesComponent,
    HeaderComponent,
    SidebarComponent,



  ],
  imports: [
    CommonModule,
    FormsModule,
    // InMemoryWebApiModule.forRoot(AllModulesData),
    PerfectScrollbarModule,
    AllModulesRoutingModule,
    NgHttpLoaderModule.forRoot(), 

  ],
  providers: [
    AllModulesService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    HeaderService
  ]
})
export class AllModulesModule { }
