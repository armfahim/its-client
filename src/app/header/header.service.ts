import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) {
  }

  getDataFromJson(section) {
    return this.http.get(`assets/json/${section}.json`);
  }

}
