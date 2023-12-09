import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
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
import { DatePipe } from "@angular/common";

declare const $: any;
@Component({
  selector: "app-manage-jobs",
  templateUrl: "./manage-jobs.component.html",
  styleUrls: ["./manage-jobs.component.css"],
})
export class ManageJobsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "manageJobs";
  public allManageJobs: any = [];
  public addManageJobs: FormGroup;
  public editManageJobs: FormGroup;
  public editId: any;
  public tempId: any;
  public pipe = new DatePipe("en-US");
  public purchaseDateFormat;
  public purchaseToDateFormat;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getManageJobs();

    // Add Provident Form Validation And Getting Values

    this.addManageJobs = this.formBuilder.group({
      addJobTitle: ["", [Validators.required]],
      addDepartment: ["", [Validators.required]],
      addStartDate: ["", [Validators.required]],
      addExpireDate: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editManageJobs = this.formBuilder.group({
      editJobTitle: ["", [Validators.required]],
      editDepartment: ["", [Validators.required]],
      editStartDate: ["", [Validators.required]],
      editExpireDate: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getManageJobs() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allManageJobs = data;
      this.dtTrigger.next();
    });
  }

  // Add Provident Modal Api Call

  addJobs() {
    if (this.addManageJobs.valid) {
      let purchaseDateFormat = this.pipe.transform(
        this.addManageJobs.value.addStartDate,
        "dd-MM-yyyy"
      );
      let purchaseToDateFormat = this.pipe.transform(
        this.addManageJobs.value.addExpireDate,
        "dd-MM-yyyy"
      );
      let obj = {
        jobTitle: this.addManageJobs.value.addJobTitle,
        department: this.addManageJobs.value.addDepartment,
        startDate: purchaseDateFormat,
        expireDate: purchaseToDateFormat,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getManageJobs();
      $("#add_job").modal("hide");
      this.addManageJobs.reset();
      this.toastr.success("Job is added", "Success");
    }
  }
  // to know the date picker changes

  from(data) {
    this.purchaseDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.purchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Provident Modal Api Call

  editJobs() {
    let obj = {
      jobTitle: this.editManageJobs.value.editJobTitle,
      department: this.editManageJobs.value.editDepartment,
      startDate: this.purchaseDateFormat,
      expireDate: this.purchaseToDateFormat,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getManageJobs();
    $("#edit_job").modal("hide");
    this.toastr.success("Job is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allManageJobs.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allManageJobs[index];
    this.editManageJobs.setValue({
      editJobTitle: toSetValues.jobTitle,
      editDepartment: toSetValues.department,
      editStartDate: toSetValues.startDate,
      editExpireDate: toSetValues.expireDate,
    });
  }

  // Delete Provident Modal Api Call

  deleteJobs() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getManageJobs();
      $("#delete_job").modal("hide");
      this.toastr.success("Job is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
