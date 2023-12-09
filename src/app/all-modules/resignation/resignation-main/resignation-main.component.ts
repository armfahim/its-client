import { Component, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";

declare const $: any;
@Component({
  selector: "app-resignation-main",
  templateUrl: "./resignation-main.component.html",
  styleUrls: ["./resignation-main.component.css"],
})
export class ResignationMainComponent implements OnInit {
  lstResignation: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "resignationmain";
  public tempId: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addResignForm: FormGroup;
  public editResignForm: FormGroup;
  public NoticedDate;
  public ResignDate;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadResignation();
    this.dtOptions = {
      // ... skipped ...
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });

    this.editResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  resignation Api Call
  loadResignation() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstResignation = data;
      this.rows = this.lstResignation;
      this.srch = [...this.rows];
    });
  }

  // Add Resignation  Modal Api Call
  addResignation() {
    if (this.addResignForm.valid) {
      let noticedDate = this.pipe.transform(
        this.addResignForm.value.NoticeDated,
        "dd-MM-yyyy"
      );
      let resignationDate = this.pipe.transform(
        this.addResignForm.value.ResignationDate,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.addResignForm.value.EmployeeName,
        department: "Web development",
        noticedDate: noticedDate,
        resignDate: resignationDate,
        reason: this.addResignForm.value.ReasonName,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadResignation();
      $("#add_resignation").modal("hide");
      this.addResignForm.reset();
      this.toastr.success("Resignation added sucessfully...!", "Success");
    }
  }

  // to know the date picker changes

  from(data) {
    this.NoticedDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.ResignDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  //update api call
  editResignation() {
    if (this.editResignForm.valid) {
      let obj = {
        employee: this.editResignForm.value.EmployeeName,
        department: "Web development",
        noticedDate: this.NoticedDate,
        resignDate: this.ResignDate,
        reason: this.editResignForm.value.ReasonName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadResignation();
      $("#edit_resignation").modal("hide");
      this.toastr.success("Resignation Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstResignation.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstResignation[index];
    this.editResignForm.setValue({
      EmployeeName: toSetValues.employee,
      NoticeDated: toSetValues.noticedDate,
      ResignationDate: toSetValues.resignDate,
      ReasonName: toSetValues.reason,
    });
  }

  // delete api call
  deleteResignation() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadResignation();
    $("#delete_resignation").modal("hide");
    this.toastr.success("Resignation  deleted sucessfully..!", "Success");
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
