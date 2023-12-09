import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-invoice-settings",
  templateUrl: "./invoice-settings.component.html",
  styleUrls: ["./invoice-settings.component.css"],
})
export class InvoiceSettingsComponent implements OnInit {
  public invoiceSettings: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.invoiceSettings = this.formBuilder.group({
      invoicePrefix: ["INV", [Validators.required]],
      invoiceLogo: [""],
    });
  }

  submitInvoiceSettings() {
    if (this.invoiceSettings.valid) {
      this.toastr.success("Invoice settings is added", "Success");
    }
  }
}
