import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginService } from "../login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService,private router:Router,  private toastr: ToastrService,){
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      let errorMsg;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        if (err.status === 404 || err.status === 403 || err.status === 401) {
          this.login.logout();
          this.router.navigate(['login']);
          return;
        }
        //handle your auth error or rethrow
        if(err.status === 0){
          // this.toastr.error('Your session has timed out','error',{timeOut: 4000});
          this.login.logoutWithoutToastr();
        //   this.router.navigate(['login']);
          this.router.navigate(['error/error404']);
          return;
        }
        if(err.status == 500){
          this.router.navigate(['error/error500']);
          return;
        }
        console.error(errorMsg);

        if(err.status == 300){
            this.login.logout();
            this.router.navigate(['login']);
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token (LocalStorage) request
        let authReq=req;
        const token=this.login.getToken();

        if(token !=null){
            authReq=authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`},
            });
        }
        // console.log('Modified request:', authReq);
        return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
    }
}

export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];
