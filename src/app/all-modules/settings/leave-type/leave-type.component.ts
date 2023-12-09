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

declare const $: any;
@Component({
  selector: "app-leave-type",
  templateUrl: "./leave-type.component.html",
  styleUrls: ["./leave-type.component.css"],
})
export class LeaveTypeComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "leaveType";
  public allLeaveType: any = [];
  public addLeaveType: FormGroup;
  public editLeaveType: FormGroup;
  public editId: any;
  public tempId: any;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getLeaveType();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    // Add Provident Form Validation And Getting Values

    this.addLeaveType = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      addLeaveDays: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editLeaveType = this.formBuilder.group({
      editLeave: ["", [Validators.required]],
      editLeaveDays: ["", [Validators.required]],
    });
  }

  getLeaveType() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allLeaveType = data;
      this.dtTrigger.next();
    });
  }

  // Add Provident Modal Api Call

  addLeave() {
    if (this.addLeaveType.valid) {
      let obj = {
        leaveType: this.addLeaveType.value.addLeaveType,
        leaveDays: this.addLeaveType.value.addLeaveDays,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getLeaveType();
      $("#add_leavetype").modal("hide");
      this.addLeaveType.reset();
      this.toastr.success("Leave type is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editLeave() {
    let obj = {
      leaveType: this.editLeaveType.value.editLeave,
      leaveDays: this.editLeaveType.value.editLeaveDays,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getLeaveType();
    $("#edit_leavetype").modal("hide");
    this.toastr.success("Leave type is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allLeaveType.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allLeaveType[index];
    this.editLeaveType.setValue({
      editLeave: toSetValues.leaveType,
      editLeaveDays: toSetValues.leaveDays,
    });
  }

  // Delete Provident Modal Api Call

  deleteLeave() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getLeaveType();
      $("#delete_leavetype").modal("hide");
      this.toastr.success("Leave type is deleted", "Success");
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
