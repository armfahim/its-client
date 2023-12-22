import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private login:LoginService,private router:Router, private toastr: ToastrService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let authorities = this.login.getLoggedInUserRole();

    if(this.login.isLoggedIn() && ( authorities != null && authorities.includes("ADMIN")
      || authorities.includes("EMPLOYEE"))){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
