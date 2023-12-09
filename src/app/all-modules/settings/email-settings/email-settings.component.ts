import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.css']
})
export class EmailSettingsComponent implements OnInit {
  public emailSettings: FormGroup;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
    this.emailSettings = this.formBuilder.group({
      phpMail: ['', [Validators.required]],
      smtp: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      emailName: ['', [Validators.required]],
      smtpHost: ['', [Validators.required]],
      smtpUser: ['', [Validators.required]],
      smtpPassword: ['', [Validators.required]],
      smtpPort: ['', [Validators.required]],
      smtpSecurity: ['', [Validators.required]],
      smtpAuthentication: ['', [Validators.required]],
    });
  }

  submitEmailSettings() {
    if (this.emailSettings.valid) {
      
      this.toastr.success("Email settings is added", 'Success')
    }
  }

}
