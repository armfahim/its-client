import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-company-settings",
  templateUrl: "./company-settings.component.html",
  styleUrls: ["./company-settings.component.css"],
})
export class CompanySettingsComponent implements OnInit {
  public companySettings: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.companySettings = this.formBuilder.group({
      companyName: ["Delta Technoligies", [Validators.required]],
      contactPerson: ["Mclaren", [Validators.required]],
      address: ["Penning street", [Validators.required]],
      country: ["USA", [Validators.required]],
      city: ["Nyanose", [Validators.required]],
      state: ["Alabama", [Validators.required]],
      postalCode: ["845321", [Validators.required]],
      email: ["mclaren@deltatechnoligies.com", [Validators.required]],
      phoneNumber: ["071-654124", [Validators.required]],
      mobileNumber: ["8547522541", [Validators.required]],
      fax: ["012-456213", [Validators.required]],
      website: ["www.deltatechnoligies.com", [Validators.required]],
    });
  }

  submitCompany() {
    if (this.companySettings.valid) {
      this.toastr.success("Company Settings is added", "Success");
    }
  }
}
