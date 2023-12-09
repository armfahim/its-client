import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePassword: FormGroup;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { }


  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  submitChangePassword() {
    if (this.changePassword.valid) {
      
      this.toastr.success("Password is changed", 'Success')
    }
  }

}
