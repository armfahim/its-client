import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

declare const $: any;
@Component({
  selector: "app-performance-appraisal",
  templateUrl: "./performance-appraisal.component.html",
  styleUrls: ["./performance-appraisal.component.css"],
})
export class PerformanceAppraisalComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  lstData: any[];
  url: any = "performanceappraisal";

  public tempId: any;
  public editId: any;

  public addApparaisalForm: FormGroup;
  public editApparaisalForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadData();

    /// validation for apparaisal form
    this.addApparaisalForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      SelectDate: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });

    this.editApparaisalForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      SelectDate: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get  apparaisal Api Call
  loadData() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstData = data;
      this.rows = this.lstData;
      this.srch = [...this.rows];
    });
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // Add  apparaisal type  Modal Api Call
  addApparaisal() {
    if (this.addApparaisalForm.valid) {
      let apparaisalDate = this.pipe.transform(
        this.addApparaisalForm.value.SelectDate,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.addApparaisalForm.value.EmployeeName,
        apparaisaldate: apparaisalDate,
        designation: "Web Designer",
        department: "Web development",
        status: this.addApparaisalForm.value.StatusName,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadData();
      $("#add_appraisal").modal("hide");
      this.addApparaisalForm.reset();
      this.toastr.success("Apparaisal added sucessfully...!", "Success");
    }
  }
  // Edit apparaisal Modal Api Call

  editApparaisal() {
    if (this.editApparaisalForm.valid) {
      let apparaisalDate = this.pipe.transform(
        this.editApparaisalForm.value.SelectDate,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.editApparaisalForm.value.EmployeeName,
        apparaisaldate: apparaisalDate,
        designation: "Web Designer",
        department: "Web development",
        status: this.editApparaisalForm.value.StatusName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadData();
      $("#edit_appraisal").modal("hide");
      this.toastr.success("Apparaisal updated sucessfully...!", "Success");
    }
  }
  edit(value) {
    this.editId = value;
    const index = this.lstData.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstData[index];
    this.editApparaisalForm.setValue({
      EmployeeName: toSetValues.employee,
      SelectDate: toSetValues.apparaisaldate,
      StatusName: toSetValues.status
    });
  }

  // Delete apparaisal Modal Api Call

  deleteApparaisal() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadData();
    $("#delete_appraisal").modal("hide");
    this.toastr.success("Record deleted sucessfully...!", "Success");
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
