import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
declare const $: any;
@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit, OnDestroy  {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
   public pipe = new DatePipe("en-US");
  public url: any = "shiftlist";
  public tempId: any;
  public editId: any;
  public addRevenueForm: FormGroup;
  public editRevenueForm: FormGroup;
  public lstRevenue;
  public editedvalue;
  public rows = [];
  public srch = [];
  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
   // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
  	this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  	this.LoadRevenue();
  	this.addRevenueForm = this.formBuilder.group({
      ShiftName: ["", [Validators.required]],
      MinStartTime: ["", [Validators.required]],
      StartTime: ["", [Validators.required]],
      MaxStartTime: ["", [Validators.required]],
      MinEndTime: ["", [Validators.required]],
      EndTime: ["", [Validators.required]],
      MaxEndTime: ["", [Validators.required]],
      BreakTime: ["", [Validators.required]],
    });
     this.editRevenueForm = this.formBuilder.group({
      ShiftName: ["", [Validators.required]],
      MinStartTime: ["", [Validators.required]],
      StartTime: ["", [Validators.required]],
      MaxStartTime: ["", [Validators.required]],
      MinEndTime: ["", [Validators.required]],
      EndTime: ["", [Validators.required]],
      MaxEndTime: ["", [Validators.required]],
      BreakTime: ["", [Validators.required]],
    });
  }
   // Get department list  Api Call
  LoadRevenue() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstRevenue = data;
      this.dtTrigger.next();
       this.rows = this.lstRevenue;
      this.srch = [...this.rows];
      });
  }
      // Add Department  Modal Api Call
  addRevenue() {
    if (this.addRevenueForm.valid) {
      let obj = {
        shiftname: this.addRevenueForm.value.ShiftName,
        minstarttime: this.addRevenueForm.value.MinStartTime,
        starttime: this.addRevenueForm.value.StartTime,
        maxstarttime: this.addRevenueForm.value.MaxStartTime,
        minendtime: this.addRevenueForm.value.MinEndTime,
        endtime: this.addRevenueForm.value.EndTime,
        maxendtime: this.addRevenueForm.value.MaxEndTime,
        breaktime: this.addRevenueForm.value.BreakTime,
        id: 0,
        status: "Active"
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
      	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
       
      });
      this.LoadRevenue();
      $("#add_shift").modal("hide");
      this.addRevenueForm.reset();
      this.toastr.success("Shift-list added sucessfully...!", "Success");
    }
  }

  editRevenue() {
    if (this.editRevenueForm.valid) {
      let obj = {
        shiftname: this.editRevenueForm.value.ShiftName,
        minstarttime: this.editRevenueForm.value.MinStartTime,
        starttime: this.editRevenueForm.value.StartTime,
        maxstarttime: this.editRevenueForm.value.MaxStartTime,
        minendtime: this.editRevenueForm.value.MinEndTime,
        endtime: this.editRevenueForm.value.EndTime,
        maxendtime: this.editRevenueForm.value.MaxEndTime,
        breaktime: this.editRevenueForm.value.BreakTime,
        id: this.editId,
        status: "Active"
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {  
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });     
      });
      this.LoadRevenue();
      $("#edit_shift").modal("hide");
      this.toastr.success("Budget-list Updated sucessfully...!", "Success");
    }
  }
   // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.ShiftName
    this.editId = value.id;
    const index = this.lstRevenue.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstRevenue[index];
    this.editRevenueForm.setValue({
      ShiftName: toSetValues.shiftname,
      MinStartTime: toSetValues.minstarttime,
      StartTime: toSetValues.starttime,
      MaxStartTime: toSetValues.maxstarttime,
      MinEndTime: toSetValues.minendtime,
      EndTime: toSetValues.endtime,
      MaxEndTime: toSetValues.maxendtime,
      BreakTime: toSetValues.breaktime,
    });
  }

     deleteRevenue() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      this.LoadRevenue();
      $("#delete_employee").modal("hide");
      this.toastr.success("Budget-revenue deleted sucessfully..!", "Success");
    });
  }
   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
