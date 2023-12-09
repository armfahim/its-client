import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare const $: any;
@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  lstDesignation: any[];
  url: any = "designation";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public addDesignationForm: FormGroup;
  public editDesignationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadDesignation();

    this.addDesignationForm = this.formBuilder.group({
      Designation: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });

    this.editDesignationForm = this.formBuilder.group({
      Designation: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });
  }

  // Get designation list  Api Call
  LoadDesignation() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstDesignation = data;
      this.dtTrigger.next();
      this.rows = this.lstDesignation;
      this.srch = [...this.rows];
    });
  }

  // Add Designation  Modal Api Call
  addDesignation() {
    if (this.addDesignationForm.valid) {
      let obj = {
        designation: this.addDesignationForm.value.Designation,
        departmentName: this.addDesignationForm.value.DepartmentName,
        id: 1,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadDesignation();
      $("#add_designation").modal("hide");
      this.addDesignationForm.reset();
      this.toastr.success("Desigantion added sucessfully...!", "Success");
    }
  }

  editDesignation() {
    if (this.editDesignationForm.valid) {
      let obj = {
        designation: this.editDesignationForm.value.Designation,
        departmentName: this.editDesignationForm.value.DepartmentName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadDesignation();
      $("#edit_designation").modal("hide");
      this.toastr.success("Department Updated sucessfully...!", "Success");
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstDesignation.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstDesignation[index];
    this.editDesignationForm.setValue({
      Designation: toSetValues.designation,
      DepartmentName: toSetValues.departmentName,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteDesignation() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.LoadDesignation();
        $("#delete_designation").modal("hide");
        this.toastr.success("Designation deleted sucessfully..!", "Success");
      });
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
