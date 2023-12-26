import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }
  getPaginatedData(endPoint: any,params: any): Observable<any> {
    // Include DataTables parameters in the API request
    // &sort=${params.orderColumnName}&dir=${params.order[0].dir}
    const url = `${this.baseUrl}${endPoint}?page=${params.start / params.length + 1}&size=${params.length}&sortBy=${params.orderColumnName}&dir=${params.order[0].dir}&invoiceNumber=${params.supplierName}`;
    return this.http.get(url);
  }

}
