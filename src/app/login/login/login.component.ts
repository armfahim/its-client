import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  loading = false;
  submitted = false;
  isLoggedIn : any;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {

    //login form
    this.loginForm = this.formBuilder.group({
      username:["",Validators.required],
      password: ['', [Validators.minLength(4),  Validators.required]],
    });

  }

  async onSubmit(){
    if (this.loginForm.invalid) {
      this.toastr.info("Please insert valid data");
      return;
    }

    this.loading = true;
    let authRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.loginService.authenticateRequest(authRequest).pipe(delay(1300)).subscribe((response:any) =>{
       //login...
       this.loginService.storeToken(response.data.accessToken);

      //  this.loginService.getCurrentUser().subscribe((user:any)=>{
        // setting layer item in localstorage
        const layerArr = JSON.parse(localStorage.getItem("layer"));

        this.loginService.setUser(response.data.user);
        let authorities = response.data.user.role;

        if(authorities.includes("EMPLOYEE") || authorities.includes("ADMIN")){
            this.loading = false;
            this.toastr.success('You are now authenticated','success');
            this.toastr.success('You are now authenticated','Success', { positionClass:'toast-custom' })
            this.router.navigate(['dashboard']);
            this.loginService.loginStatusSubject.next(true);
          }else{
            this.loading = false;
            this.loginService.logout();
          }
      //   }
      //  );
     },
     (error) => {
      this.loading = false;
       this.toastr.error('Invalid Credentials', "Try again");
     })
  }

  socialLogin() {
      window.location.href = 'http://localhost:8082/its/api/login/oauth2/code/google';
  //   this.loginService.socialLogin('google').pipe(delay(1300)).subscribe((response:any) =>{
  //     //login...
  //     this.loginService.storeToken(response.data.accessToken);

  //      this.loginService.setUser(response.data.user);
  //      let authorities = response.data.user.role;
  //   },
  //   (error) => {
  //    this.loading = false;
  //     this.toastr.error('Invalid Credentials', "Try again");
  //   })
  }

}
