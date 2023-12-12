import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  public apiurl;

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
  get(type): Observable<any> {
    // this.apiurl = `api/${type}`;
    this.apiurl = type;
    return this.http
      .get<any>(this.apiurl)
      .pipe(tap(), catchError(this.handleError));
  }

  getPaginated(endPoint: any,params: any): Observable<any> {
    // Include DataTables parameters in the API request
    // "http://localhost:9000/its/api/v1/supplier-details/list",
    // &sort=${params.orderColumnName}&dir=${params.order[0].dir}
    const url = `${this.baseUrl}${endPoint}?page=${params.start / params.length + 1}&size=${params.length}&sortBy=${params.orderColumnName}&dir=${params.order[0].dir}`;
    return this.http.get(url);
  }

  // Post Method Api
  add(user: any, type): Observable<any> {
    this.apiurl = type;
    user.id = null;
    return this.http
      .post<any>(this.apiurl, user, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  // Update Method Api
  update(user: any, type): Observable<any> {
    this.apiurl = `api/${type}`;
    const url = `${this.apiurl}/${user.id}`;
    return this.http.put<any>(url, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  // Delete Method Api
  delete(id: id, type): Observable<id> {
    this.apiurl = `api/${type}`;
    const url = `${this.apiurl}/${id}`;
    return this.http
      .delete<id>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
