import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Bootstrap DataTable
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './guard/auth.interceptor';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(), 
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [authInterceptorProviders,{ provide: LocationStrategy, useClass: HashLocationStrategy},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
