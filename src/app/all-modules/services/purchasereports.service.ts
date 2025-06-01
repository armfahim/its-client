import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasereportsService {

  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }
  getPurchaseAmountBySupplier(endPoint: any,params: any): Observable<any> {
    const url = `${this.baseUrl}${endPoint}?supplierId=${params.supplierId}&branchId=${params.branchId}`;
    return this.http.get(url);
  }

  getPurchaseAmountBySupplierAndYearInMonth(endPoint: any,params: any): Observable<any> {
    const url = `${this.baseUrl}${endPoint}?year=${params.year}&supplierId=${params.supplierId}&branchId=${params.branchId}`;
    return this.http.get(url);
  }
}
