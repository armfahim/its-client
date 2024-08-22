import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject, Subscription } from "rxjs";
import { retry } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  baseUrl = environment.baseUrl;

  public loginStatusSubject = new Subject<boolean>();
  clearTimeout: any;


  constructor(private http: HttpClient, private toastr: ToastrService) {}

  //current user: which is loogedin
  public getCurrentUser() {
    return this.http.get(`${this.baseUrl}/currentUser`);
  }

  //Token:: generate Token
  public authenticateRequest(loginData: any) {
    return this.http.post(`${this.baseUrl}/v1/auth/authenticate`, loginData);
  }

  public socialLogin(param:any){
    return this.http.get(`${this.baseUrl}/v1/auth/oauth2/authorization/${param}`);
  }

  //login user:: store token in the local storage
  public storeToken(token) {
    localStorage.setItem("token", token);
    this.loginStatusSubject.next(true);
    return true;
  }

  //Layer:: set layer in local storage
  public setLayer(layer){
    localStorage.setItem("layer", JSON.stringify(layer));
    this.loginStatusSubject.next(true);
    return true;
  }

  //isLoogedIn: user is loggedin or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == "" || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout:: remove token from localstorage
  public logoutWithoutToastr() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
    // this.sendLogoutRequest(this.getUser());
    return true;
  }

  //logout:: remove token from localstorage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("activeTabName");
    localStorage.removeItem("layer");

    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
    // this.sendLogoutRequest(this.getUser());
    this.toastr.warning("Thank You", "logout");
    return true;
  }

  //getToken
  public getToken() {
    return localStorage.getItem("token");
  }

  //set userDetail
  public setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logoutWithoutToastr();
      return null;
    }
  }


  //get user role
  public getLoggedInUserRole() {
    let loggedInUser = this.getUser();
    let role = null;
    if (loggedInUser != null) {
        return loggedInUser.role;
    }else{
      this.logoutWithoutToastr();
      return null;
    }
  }

  public sendLogoutRequest(user) {
    return this.http.post(`${this.baseUrl}/v1/auth/logout`,user);
  }



  // Register User
  public register(user) {
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }
  // Get By Id
  public getById(id) {
    return this.http.get(`${this.baseUrl}/user/get/${id}`);
  }

  // sendPostRequest(apiURL, user: User): Observable<User> {
  //   return this.http.post<User>(apiURL, user);
  // }

  // sendPutRequest(apiURL, user: User): Observable<User> {
  //   return this.http.put<User>(apiURL, user);
  // }

  // public sendGetRequest(apiURL, queryParams) {
  //   return this.http.get(apiURL, { params: queryParams }).pipe(retry(3));
  // }
}


