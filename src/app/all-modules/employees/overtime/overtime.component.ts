import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
declare const $: any;

@Component({
  selector: "app-overtime",
  templateUrl: "./overtime.component.html",
  styleUrls: ["./overtime.component.css"],
})
export class OvertimeComponent implements OnInit {
  lstOvertime: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  url: any = "overtime";
  public tempId: any;
  public editId: any;
  public addOvertimeForm: FormGroup;
  public editOvertimeForm: FormGroup;
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

    this.LoadOvertime();
    this.addOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }

  // Get overtime list  Api Call
  LoadOvertime() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstOvertime = data;
      this.dtTrigger.next();
      this.rows = this.lstOvertime;
      this.srch = [...this.rows];
    });
  }

  // Add overtime  Modal Api Call
  addOvertime() {
    if (this.addOvertimeForm.valid) {
      let Datetime = this.pipe.transform(
        this.addOvertimeForm.value.OtDate,
        "dd-MM-yyyy"
      );
      let obj = {
        name: this.addOvertimeForm.value.EmployeeName,
        otDate: Datetime,
        otHrs: this.addOvertimeForm.value.OtHrs,
        otType: "Normal day OT 1.5x",
        status: "New",
        approvedBy: "Richard Miles",
        description: this.addOvertimeForm.value.Description,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadOvertime();
      $("#add_overtime").modal("hide");
      this.addOvertimeForm.reset();
      this.toastr.success("Overtime added sucessfully...!", "Success");
    }
  }

  editOvertime() {
    if (this.editOvertimeForm.valid) {
      let Datetime = this.pipe.transform(
        this.editOvertimeForm.value.OtDate,
        "dd-MM-yyyy"
      );
      let obj = {
        name: this.editOvertimeForm.value.EmployeeName,
        otDate: Datetime,
        otHrs: this.editOvertimeForm.value.OtHrs,
        otType: "Normal day OT 1.5x",
        status: "New",
        approvedBy: "Richard Miles",
        description: this.editOvertimeForm.value.Description,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadOvertime();
      $("#edit_overtime").modal("hide");
      this.toastr.success("Overtime Updated sucessfully...!", "Success");
    }
  }

  // To Get The Overtime Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstOvertime.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstOvertime[index];
    this.editOvertimeForm.setValue({
      EmployeeName: toSetValues.name,
      OtDate: toSetValues.otDate,
      OtHrs: toSetValues.otHrs,
      Description: toSetValues.description,
    });
  }

  // Delete Overtime Modal Api Call

  deleteOvetime() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadOvertime();
      $("#delete_overtime").modal("hide");
      this.toastr.success("Overtime deleted sucessfully..!", "Success");
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
