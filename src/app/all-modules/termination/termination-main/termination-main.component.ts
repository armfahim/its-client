import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';

declare const $: any;
@Component({
  selector: "app-termination-main",
  templateUrl: "./termination-main.component.html",
  styleUrls: ["./termination-main.component.css"],
})
export class TerminationMainComponent implements OnInit {
  lstTermination: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  url: any = "terminationmain";

  public tempId: any;
  public editId: any;

  public addTerminationForm: FormGroup;
  public editTerminationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadTermination();
    this.dtOptions = {

      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    }

    this.addTerminationForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      TerminationTyped: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      TerminationDated: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });

    this.editTerminationForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      TerminationTyped: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      TerminationDated: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  termination Api Call
  loadTermination() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTermination = data;
      this.rows = this.lstTermination;
      this.srch = [...this.rows];
    });
  }

  // Add  termination  Modal Api Call
  addTermination() {
    if (this.addTerminationForm.valid) {
      let noticedDate = this.pipe.transform(
        this.addTerminationForm.value.NoticeDated,
        "dd-MM-yyyy"
      );
      let terminationDate = this.pipe.transform(
        this.addTerminationForm.value.TerminationDated,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.addTerminationForm.value.EmployeeName,
        department: "Web development",
        terminationType: this.addTerminationForm.value.TerminationTyped,
        noticedDate: noticedDate,
        terminationDate: terminationDate,
        reason: this.addTerminationForm.value.ReasonName,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadTermination();
      $("#add_termination").modal("hide");
      this.addTerminationForm.reset();
      this.toastr.success("Termination added sucessfully...!", "Success");
    }
  }

  // update api call 
  editTermination() {
    if (this.editTerminationForm.valid) {
      // let noticed = this.pipe.transform(
      //   this.editTerminationForm.value.NoticeDated,
      //   "dd-MM-yyyy"
      // );
      // let termination = this.pipe.transform(
      //   this.editTerminationForm.value.TerminationDated,
      //   "dd-MM-yyyy"
      // );
      let obj = {
        employee: this.editTerminationForm.value.EmployeeName,
        department: "Web development",
        terminationType: this.editTerminationForm.value.TerminationTyped,
        noticedDate: this.editTerminationForm.value.NoticeDated,
        terminationDate: this.editTerminationForm.value.TerminationDated,
        reason: this.editTerminationForm.value.ReasonName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadTermination();
      $("#edit_termination").modal("hide");
      this.toastr.success("Termination Updated sucessfully...!", "Success");
    }
  }


  // To Get The termination Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTermination.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTermination[index];
    this.editTerminationForm.setValue({
      EmployeeName: toSetValues.employee,
      TerminationTyped: toSetValues.terminationType,
      NoticeDated: toSetValues.noticedDate,
      TerminationDated: toSetValues.terminationDate,
      ReasonName: toSetValues.reason,
    });
  }


  // delete api call
  deleteTermination() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadTermination();
    $("#delete_termination").modal("hide");
    this.toastr.success("Termination  deleted sucessfully..!", "Success");
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
