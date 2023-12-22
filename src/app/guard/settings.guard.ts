import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate {

  constructor(private login:LoginService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let currentUser = this.login.getUser();
    let authorities = this.login.getLoggedInUserRole();

    if(this.login.isLoggedIn()){

      if( (currentUser.groupUsername=="devGroup" || currentUser.groupUsername=="hrGroup"  ) || (authorities.includes("ROLE_SUPER_ADMIN")) ){
        return true;
      }else{
        this.router.navigate(['error/error403']);
        return false;
      }

    }

    this.router.navigate(['login']);

    return false;
  }

}
