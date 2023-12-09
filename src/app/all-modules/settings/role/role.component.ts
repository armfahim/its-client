import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

declare const $: any;
@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.css"],
})
export class RoleComponent implements OnInit {
  public url: any = "roles";
  public allroles: any = [];
  public addRoles: FormGroup;
  public editRoles: FormGroup;
  public editId: any;
  public tempId: any;

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getRoles();

    // Add Provident Form Validation And Getting Values

    this.addRoles = this.formBuilder.group({
      addRoleName: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editRoles = this.formBuilder.group({
      editRoleName: ["", [Validators.required]],
    });
  }

  getRoles() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allroles = data;
    });
  }

  // Add Provident Modal Api Call

  addRolesSubmit() {
    if (this.addRoles.valid) {
      let obj = { roleName: this.addRoles.value.addRoleName };
      this.allModuleService.add(obj, this.url).subscribe((data) => {});
      this.getRoles();
      $("#add_role").modal("hide");
      this.addRoles.reset();
      this.toastr.success("Roles is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editRolesSubmit() {
    let obj = { roleName: this.editRoles.value.editRoleName, id: this.editId };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {});
    this.getRoles();
    $("#edit_role").modal("hide");
    this.toastr.success("Roles is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allroles.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allroles[index];
    this.editRoles.setValue({
      editRoleName: toSetValues.roleName,
    });
  }

  // Delete Provident Modal Api Call

  deleteRoles() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getRoles();
      $("#delete_role").modal("hide");
      this.toastr.success("Roles is deleted", "Success");
    });
  }
}
