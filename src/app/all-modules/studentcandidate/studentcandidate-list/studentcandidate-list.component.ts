import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
declare const $: any;
@Component({
  selector: 'app-studentcandidate-list',
  templateUrl: './studentcandidate-list.component.html',
  styleUrls: ['./studentcandidate-list.component.css']
})
export class StudentcandidateListComponent implements OnInit, OnDestroy   {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
   public pipe = new DatePipe("en-US");
	public url: any = "candidate";
  public tempId: any;
  public editId: any;
  public addCandidateForm: FormGroup;
  public editCandidateForm: FormGroup;
  public lstCandidate;
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
  	this.LoadCandidate();

    this.addCandidateForm = this.formBuilder.group({
      EmailName: ["", [Validators.required]],
       CreateName: ["", [Validators.required]],
       PhoneName: ["", [Validators.required]],

    });
    this.editCandidateForm = this.formBuilder.group({
      EmailName: ["", [Validators.required]],
       CreateName: ["", [Validators.required]],
       PhoneName: ["", [Validators.required]],
    });
  }
   // Get department list  Api Call
  LoadCandidate() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstCandidate = data;
      this.dtTrigger.next();
       this.rows = this.lstCandidate;
      this.srch = [...this.rows];
      });
  }

  // Add questions  Modal Api Call
  addCandidate() {
    if (this.addCandidateForm.valid) {
      let obj = {
        email: this.addCandidateForm.value.EmailName,
        createddate: this.addCandidateForm.value.CreateName,
        mobilenumber: this.addCandidateForm.value.PhoneName,
        id: 0,
        name: "John Doe",
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadCandidate();
      $("#add_employee").modal("hide");
      this.addCandidateForm.reset();
      this.toastr.success("Add candidate added sucessfully...!", "Success");
    }
  }



    editCandidate() {
    if (this.editCandidateForm.valid) {
      let obj = {
        email: this.editCandidateForm.value.EmailName,
        createddate: this.editCandidateForm.value.CreateName,
        mobilenumber: this.editCandidateForm.value.PhoneName,
        id: this.editId,
        name: "John Doe",

      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
      	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        
      });
      this.LoadCandidate();
      $("#edit_job").modal("hide");
      this.toastr.success("Edit job Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.email
    this.editId = value.id;
    const index = this.lstCandidate.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstCandidate[index];
    this.editCandidateForm.setValue({
      EmailName: toSetValues.email,
      CreateName: toSetValues.createddate,
      PhoneName: toSetValues.mobilenumber,
    });
  }

  deleteCandidate() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      
      this.LoadCandidate();
      $("#delete_job").modal("hide");
      this.toastr.success("candidate deleted sucessfully..!", "Success");
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
