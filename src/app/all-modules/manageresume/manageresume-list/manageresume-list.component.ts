import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
declare const $: any;
@Component({
  selector: 'app-manageresume-list',
  templateUrl: './manageresume-list.component.html',
  styleUrls: ['./manageresume-list.component.css']
})
export class ManageresumeListComponent implements OnInit, OnDestroy  {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
	public url: any = "manage";
  public pipe = new DatePipe("en-US");
  public tempId: any;
  public editId: any;
  public editCandidateForm: FormGroup;
  public lstManage;
  public editedvalue;
 public rows = [];
  public srch = [];
  public editPurchaseDateFormat;
  public editPurchaseToDateFormat;

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
  	this.LoadManage();

    this.editCandidateForm = this.formBuilder.group({
      JobName: ["", [Validators.required]],
       Department: ["", [Validators.required]],
       JobType: ["", [Validators.required]],
       Status: ["", [Validators.required]],
       Startdate: ["", [Validators.required]],
       Expiredate: ["", [Validators.required]],
    });
  }
   ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
    //Get department list  Api Call
  LoadManage() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstManage = data;
      // console.log(this.lstManage);
      // this.dtTrigger.next();
       this.rows = this.lstManage;
      this.srch = [...this.rows];
      });
  }

from(data) {
    this.editPurchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  editCandidate() {
    if (this.editCandidateForm.valid) {
      let obj = {
        jobtitle: this.editCandidateForm.value.JobName,
        department: this.editCandidateForm.value.Department,
        jobtype: this.editCandidateForm.value.JobType,
        status: this.editCandidateForm.value.Status,
        startdate: this.editCandidateForm.value.editPurchaseToDateFormat,
        expiredate: this.editCandidateForm.value.editPurchaseToDateFormat,
        id: this.editId,
        name1: "John Doe",
        name2: "Web Designer",
        resume: "Download"

      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
      	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
         this.dtTrigger.next();
      });
     
      this.LoadManage();
      $("#edit_job").modal("hide");
      this.toastr.success("Edit manageresume Updated sucessfully...!", "Success");
    }
  }
   // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    
  	this.editedvalue = value.jobtitle
    this.editId = value.id;
    
    const index = this.lstManage.findIndex((item) => {
      return item.id === value.id;
      
    });
    let toSetValues = this.lstManage[index];
    this.editCandidateForm.setValue({
      JobName: toSetValues.jobtitle,
      Department: toSetValues.department,
      JobType: toSetValues.jobtype,
      Status: toSetValues.status,
      Startdate: toSetValues.startdate,
      Expiredate: toSetValues.expiredate,
    });
  }
  deleteManage() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      this.dtTrigger.next();
     
    });
     this.LoadManage();
      $("#delete_job").modal("hide");
      this.toastr.success("Manageresume deleted sucessfully..!", "Success");
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
