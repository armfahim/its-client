import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
const routes: Routes = [
  {
    path:"",
    component:PagesComponent,
    children:[
      {
        path:"search",
        component:SearchComponent
      },
      {
        path:"faq",
        component:FaqComponent
      },
      {
        path:"terms",
        component:TermsComponent
      },
      {
        path:"privacy-policy",
        component:PrivacyPolicyComponent
      },
      {
        path:"blank-page",
        component:BlankPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
