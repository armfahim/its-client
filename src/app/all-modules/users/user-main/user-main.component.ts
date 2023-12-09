import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
@Component({
  selector: "app-user-main",
  templateUrl: "./user-main.component.html",
  styleUrls: ["./user-main.component.css"],
})
export class UserMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "users";
  public allUsers: any = [];
  public addUsers: FormGroup;
  public editUsers: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.getUsers();

    // Add Provident Form Validation And Getting Values

    this.addUsers = this.formBuilder.group({
      addUserName: ["", [Validators.required]],
      addEmail: ["", [Validators.required]],
      addRole: ["", [Validators.required]],
      addCompany: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editUsers = this.formBuilder.group({
      editUsersName: ["", [Validators.required]],
      editEmail: ["", [Validators.required]],
      editRole: ["", [Validators.required]],
      editCompany: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.allUsers = [];
    this.getUsers();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getUsers() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allUsers = data;
      this.rows = this.allUsers;
      this.srch = [...this.rows];
    });
  }

  // Add Provident Modal Api Call

  addUsersSubmit() {
    if (this.addUsers.valid) {
      let obj = {
        name: this.addUsers.value.addUserName,
        designation: "Web Designer",
        email: this.addUsers.value.addEmail,
        role: this.addUsers.value.addRole,
        company: this.addUsers.value.addCompany,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getUsers();
      $("#add_user").modal("hide");
      this.addUsers.reset();
      this.toastr.success("Users is added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // Edit Provident Modal Api Call

  editUsersSubmit() {
    if (this.editUsers.valid) {
      let obj = {
        name: this.editUsers.value.editUsersName,
        designation: "Android Developer",
        email: this.editUsers.value.editEmail,
        company: this.editUsers.value.editCompany,
        role: this.editUsers.value.editRole,
        id: this.editId,
      };
      this.allModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getUsers();
      $("#edit_user").modal("hide");
      this.toastr.success("Users is edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  edit(value) {
    this.editId = value;
    const index = this.allUsers.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allUsers[index];
    this.editUsers.setValue({
      editUsersName: toSetValues.name,
      editEmail: toSetValues.email,
      editRole: toSetValues.role,
      editCompany: toSetValues.company,
    });
  }

  // Delete Provident Modal Api Call

  deleteUsers() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getUsers();
    $("#delete_user").modal("hide");
    this.toastr.success("Users is deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.company.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchRole(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.role.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
