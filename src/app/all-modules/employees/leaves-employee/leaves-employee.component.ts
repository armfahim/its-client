import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
declare const $: any;
@Component({
  selector: "app-leaves-employee",
  templateUrl: "./leaves-employee.component.html",
  styleUrls: ["./leaves-employee.component.css"],
})
export class LeavesEmployeeComponent implements OnInit, OnDestroy {
  lstLeave: any[];
  url: any = "employeeleaves";
  public tempId: any;
  public editId: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadLeaves();

    this.addLeaveadminForm = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get leave  Api Call
  loadLeaves() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLeave = data;
      this.dtTrigger.next();
      this.rows = this.lstLeave;
      this.srch = [...this.rows];
    });
  }

  // Add leaves for admin Modal Api Call
  addleaves() {
    if (this.addLeaveadminForm.valid) {
      let fromDate = this.pipe.transform(
        this.addLeaveadminForm.value.From,
        "dd-MM-yyyy"
      );
      let toDate = this.pipe.transform(
        this.addLeaveadminForm.value.To,
        "dd-MM-yyyy"
      );
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.addLeaveadminForm.value.addLeaveType,
        from: fromDate,
        to: toDate,
        noofDays: this.addLeaveadminForm.value.NoOfDays,
        remainleaves: this.addLeaveadminForm.value.RemainLeaves,
        reason: this.addLeaveadminForm.value.LeaveReason,
        status: "Approved",
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadLeaves();
      $("#add_leave").modal("hide");
      this.addLeaveadminForm.reset();
      this.toastr.success("Leaves added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    if (this.editLeaveadminForm.valid) {
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.editLeaveadminForm.value.LeaveType,
        from: this.editFromDate,
        to: this.editToDate,
        noofDays: this.editLeaveadminForm.value.NoOfDays,
        remainleaves: this.editLeaveadminForm.value.RemainLeaves,
        reason: this.editLeaveadminForm.value.LeaveReason,
        status: "Approved",
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadLeaves();
      $("#edit_leave").modal("hide");
      this.toastr.success("Leaves Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // Delete leaves Modal Api Call

  deleteleaves() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.loadLeaves();
      $("#delete_approve").modal("hide");
      this.toastr.success("Leaves deleted sucessfully..!", "Success");
    });
  }

  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstLeave.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstLeave[index];
    this.editLeaveadminForm.setValue({
      LeaveType: toSetValues.leaveType,
      From: toSetValues.from,
      To: toSetValues.to,
      NoOfDays: toSetValues.noofDays,
      RemainLeaves: toSetValues.remainleaves,
      LeaveReason: toSetValues.reason,
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
