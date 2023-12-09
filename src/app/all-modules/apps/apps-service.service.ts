import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppsServiceService {
  constructor(private http: HttpClient) {}

  getInboxMessages() {
    return this.http.get(`assets/json/inboxmessage.json`);
  }
}
