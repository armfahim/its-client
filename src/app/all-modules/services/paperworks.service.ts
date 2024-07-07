import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaperworksService {

  public baseUrl = environment.baseUrl;

  public paperworkSource: Subject<any> = new BehaviorSubject<any>(null);
  currentPaperwork = this.paperworkSource.asObservable();

  constructor(private http: HttpClient) {}

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }

  changePaperworkObj(obj: any) {
    this.paperworkSource.next(obj)
  }

  getPaginatedData(endPoint: any,params: any): Observable<any> {
    // Include DataTables parameters in the API request
    // &sort=${params.orderColumnName}&dir=${params.order[0].dir}
    // const url = `${this.baseUrl}${endPoint}?page=${params.start / params.length + 1}&size=${params.length}&sortBy=${params.orderColumnName}&dir=${params.order[0].dir}&invoiceNumber=${params.supplierName}`;
    const url = `${this.baseUrl}${endPoint}?` +
                `page=${params.start / params.length + 1}&` +
                `size=${params.length}&` +
                `sortBy=${params.orderColumnName}&` +
                `dir=${params.order[0].dir}&` +
                `year=${params.year}&` +
                `month=${params.month}&` +
                `paperworkTitle=${params.paperworkTitle}`;
    console.log(url);
    return this.http.get(url);
  }
}
