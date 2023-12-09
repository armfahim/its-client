import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-theme-settings",
  templateUrl: "./theme-settings.component.html",
  styleUrls: ["./theme-settings.component.css"],
})
export class ThemeSettingsComponent implements OnInit {
  public themeSettings: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.themeSettings = this.formBuilder.group({
      websiteName: ["Dreamguy's Technologies", [Validators.required]],
      lightLogo: [""],
      favicon: [""],
    });
  }
  submitThemeSettings() {
    if (this.themeSettings.valid) {
      this.toastr.success("Theme settings is added", "Success");
    }
  }
}
