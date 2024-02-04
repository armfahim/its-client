import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { AllModulesData } from "src/assets/all-modules-data/all-modules-data";
import { id } from "src/assets/all-modules-data/id";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AllModulesService {
  // Chats

  groups = {
    active: "",
    total: ["general", "video responsive survey", "500rs", "warehouse"],
  };
  members = {
    active: "Mike Litorus",
    total: [
      { name: "John Doe", count: 3 },
      { name: "Richard Miles", count: 0 },
      { name: "John Smith", count: 7 },
      { name: "Mike Litorus", count: 9 },
    ],
  };

  // Api Methods for All modules

  // public apiurl;

  // Headers Setup
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  httpOptions = {
    headers: this.headers,
  };

  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }

  // Get Method Api
  get(endPoint): Observable<any> {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http
      .get<any>(url)
      .pipe(tap(), catchError(this.handleError));
  }

  getPaginatedData(endPoint: any,params: any): Observable<any> {
    // Include DataTables parameters in the API request
    // &sort=${params.orderColumnName}&dir=${params.order[0].dir}
    const url = `${this.baseUrl}${endPoint}?page=${params.start / params.length + 1}&size=${params.length}&sortBy=${params.orderColumnName}&dir=${params.order[0].dir}&supplierName=${params.supplierName}`;
    return this.http.get(url);
  }

  // Post Method Api
  add(user: any, endPoint): Observable<any> {
    const url = `${this.baseUrl}${endPoint}`;
    user.id = null;
    return this.http
      .post<any>(url, user, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  // Update Method Api
  update(user: any, endPoint): Observable<any> {
    const url = `${this.baseUrl}${endPoint}`;
    // const url = `${this.apiurl}/${user.id}`;
    return this.http.put<any>(url, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  // Delete Method Api
  delete(id: any, endPoint): Observable<id> {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http.delete(url, {
      params: new HttpParams().set('id', id)
    }).pipe(
      map((data: any) => data
      ))
  }

  // Update Method Api
  updateRecordStatus(user: any, endPoint): Observable<any> {
    const url = `${this.baseUrl}${endPoint}`;
    return this.http.put<any>(url, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  getPendingInvoices(endPoint: any,params: any): Observable<any> {
    const url = `${this.baseUrl}${endPoint}?dayToSelectPendingInvoice=${params.days}`;
    return this.http.get(url);
  }

  public findById(id, endPoint) {
    return this.http.get(`${this.baseUrl}/${endPoint}/${id}`);
  }
}
