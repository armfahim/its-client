import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
declare const $: any;
@Component({
  selector: "app-timesheet",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.css"],
})
export class TimesheetComponent implements OnInit {
  lstTimesheet: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "timesheet";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addTimesheetForm: FormGroup;
  public editTimesheetForm: FormGroup;
  public editDatetime: any;
  public editDeadline: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.LoadTimewsheet();
    this.addTimesheetForm = this.formBuilder.group({
      Project: ["", [Validators.required]],
      TimeDate: ["", [Validators.required]],
      DeadlineName: ["", [Validators.required]],
      totalHours: ["", [Validators.required]],
      remainingHours: ["", [Validators.required]],
      Hrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editTimesheetForm = this.formBuilder.group({
      Project: ["", [Validators.required]],
      TimeDate: ["", [Validators.required]],
      DeadlineName: ["", [Validators.required]],
      totalHours: ["", [Validators.required]],
      remainingHours: ["", [Validators.required]],
      Hrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get Timesheet list  Api Call
  LoadTimewsheet() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTimesheet = data;
      this.rows = this.lstTimesheet;
      this.srch = [...this.rows];
    });
  }

  // Add Department  Modal Api Call
  addTimesheet() {
    if (this.addTimesheetForm.valid) {
      let Datetime = this.pipe.transform(
        this.addTimesheetForm.value.TimeDate,
        "dd-MM-yyyy"
      );
      let deadLine = this.pipe.transform(
        this.addTimesheetForm.value.DeadlineName,
        "dd-MM-yyyy"
      );
      let obj = {
        id: 6,
        employee: "John doe Galaviz",
        project: this.addTimesheetForm.value.Project,
        date: Datetime,
        deadline: deadLine,
        totalhrs: this.addTimesheetForm.value.totalHours,
        remainHrs: this.addTimesheetForm.value.remainingHours,
        assignedhours: "20",
        hrs: this.addTimesheetForm.value.Hrs,
        description: this.addTimesheetForm.value.Description,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.LoadTimewsheet();
      $("#add_todaywork").modal("hide");
      this.addTimesheetForm.reset();
      this.toastr.success("Timesheet added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editDatetime = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editDeadline = this.pipe.transform(data, "dd-MM-yyyy");
  }
  editTimesheet() {
    if (this.editTimesheetForm.valid) {
      let obj = {
        employee: "John doe Galaviz",
        project: this.editTimesheetForm.value.Project,
        date: this.editDatetime,
        deadline: this.editDeadline,
        totalhrs: this.editTimesheetForm.value.totalHours,
        remainHrs: this.editTimesheetForm.value.remainingHours,
        assignedhours: "20",
        hrs: this.editTimesheetForm.value.Hrs,
        description: this.editTimesheetForm.value.Description,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.LoadTimewsheet();
      $("#edit_todaywork").modal("hide");
      this.toastr.success("Timesheet Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTimesheet.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTimesheet[index];
    this.editTimesheetForm.setValue({
      Project: toSetValues.project,
      TimeDate: toSetValues.date,
      DeadlineName: toSetValues.deadline,
      totalHours: toSetValues.totalhrs,
      remainingHours: toSetValues.remainHrs,
      Hrs: toSetValues.hrs,
      Description: toSetValues.description,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteTimesheet() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
      this.LoadTimewsheet();
      $("#delete_timesheet").modal("hide");
      this.toastr.success("Timesheet deleted sucessfully..!", "Success");
    });
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
