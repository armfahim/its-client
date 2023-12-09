import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BlankPageComponent } from './blank-page/blank-page.component';

@NgModule({
  declarations: [PagesComponent, SearchComponent, FaqComponent, TermsComponent, PrivacyPolicyComponent, BlankPageComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
