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
        //handle your auth error or rethrow
        if(err.status === 0){
          this.toastr.error('You are not authorized','error',{timeOut: 4000});
          this.login.logout();
          this.router.navigate(['login']);
        }
        if (err.status === 403) {
            //navigate /delete cookies or whatever
            this.toastr.error('you are not authorized or token has been expired','error');
            this.router.navigate(['error/error403']);

            this.toastr.error(err.error,'error',{timeOut: 6000});
            this.login.logout();
            this.router.navigate(['login']);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }else if(err.status == 500){
            console.log(err.message);
            if(err.message.includes('jwt token has expired')){
                this.login.logout();
                this.router.navigate(['login']);
            }
           //this.router.navigate(['error/error500']);
        }
        else if(err.status==404){
            this.router.navigate(['error/error404']);
        }else if(err.status == 300){
            this.login.logout();
            this.router.navigate(['login']);
        } else if(err.status == 401){
            this.login.logout();
            this.toastr.info(err.error?.message);
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
