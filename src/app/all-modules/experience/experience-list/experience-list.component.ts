import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare const $: any;
@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit, OnDestroy    {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
	public url: any = "expire";
  public tempId: any;
  public editId: any;
  public addExpireForm: FormGroup;
  public editExpireForm: FormGroup;
  public lstExpire;
  public editedvalue;
  public rows = [];
  public srch = [];
  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
  	this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  	this.LoadExpire();

    this.addExpireForm = this.formBuilder.group({
      Expirelevel: ["", [Validators.required]],
       StatusName: ["", [Validators.required]],
    });
    this.editExpireForm = this.formBuilder.group({
      Expirelevel: ["", [Validators.required]],
       StatusName: ["", [Validators.required]],
    });
  }
 // Get department list  Api Call
  LoadExpire() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstExpire = data;
      this.dtTrigger.next();
       this.rows = this.lstExpire;
      this.srch = [...this.rows];
      });
  }

  // Add experience  Modal Api Call
  addExpire() {
    if (this.addExpireForm.valid) {
      let obj = {
        experience: this.addExpireForm.value.Expirelevel,
        status: this.addExpireForm.value.StatusName,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadExpire();
      $("#add_employee").modal("hide");
      this.addExpireForm.reset();
      this.toastr.success("Add experience added sucessfully...!", "Success");
    }
  }


   editExpire() {
    if (this.editExpireForm.valid) {
      let obj = {
       experience: this.editExpireForm.value.Expirelevel,
        status: this.editExpireForm.value.StatusName,
        id: this.editId,

      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
      	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        
      });
      this.LoadExpire();
      $("#edit_job").modal("hide");
      this.toastr.success("Edit experience Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.experience
    this.editId = value.id;
    const index = this.lstExpire.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstExpire[index];
    this.editExpireForm.setValue({
      Expirelevel: toSetValues.experience,
      StatusName: toSetValues.status,
    });
  }
   deleteExpire() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      
      this.LoadExpire();
      $("#delete_job").modal("hide");
      this.toastr.success("candidate deleted sucessfully..!", "Success");
    });
  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
