import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare const $: any;
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit, OnDestroy  {
	@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
	public url: any = "interview";
  public tempId: any;
  public editId: any;
  public addInterviewForm: FormGroup;
  public editInterviewForm: FormGroup;
  public lstInterview;
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
  	this.LoadInterview();

    this.addInterviewForm = this.formBuilder.group({
       AddQuestion: ["", [Validators.required]],
       OptionA: ["", [Validators.required]],
       OptionB: ["", [Validators.required]],
       OptionC: ["", [Validators.required]],
       OptionD: ["", [Validators.required]],
       Correctanswer: ["", [Validators.required]],

    });
    this.editInterviewForm = this.formBuilder.group({
      AddQuestion: ["", [Validators.required]],
       OptionA: ["", [Validators.required]],
       OptionB: ["", [Validators.required]],
       OptionC: ["", [Validators.required]],
       OptionD: ["", [Validators.required]],
       Correctanswer: ["", [Validators.required]],
    });

  }
  // Get department list  Api Call
  LoadInterview() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstInterview = data;
      this.dtTrigger.next();
       this.rows = this.lstInterview;
      this.srch = [...this.rows];
      });
  }

    // Add questions  Modal Api Call
  addInterview() {
    if (this.addInterviewForm.valid) {
      let obj = {
        questions: this.addInterviewForm.value.AddQuestion,
        option1: this.addInterviewForm.value.OptionA,
        option2: this.addInterviewForm.value.OptionB,
        option3: this.addInterviewForm.value.OptionC,
        option4: this.addInterviewForm.value.OptionD,
        correctanswer: this.addInterviewForm.value.Correctanswer,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadInterview();
      $("#add_question").modal("hide");
      this.addInterviewForm.reset();
      this.toastr.success("Questions added sucessfully...!", "Success");
    }
  }


    editInterview() {
    if (this.editInterviewForm.valid) {
      let obj = {
       questions: this.editInterviewForm.value.AddQuestion,
        option1: this.editInterviewForm.value.OptionA,
        option2: this.editInterviewForm.value.OptionB,
        option3: this.editInterviewForm.value.OptionC,
        option4: this.editInterviewForm.value.OptionD,
        correctanswer: this.editInterviewForm.value.Correctanswer,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
      	this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });       
      });
      this.LoadInterview();
      $("#edit_question").modal("hide");
      this.toastr.success("Edit questions Updated sucessfully...!", "Success");
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.questions;
    this.editId = value.id;
    const index = this.lstInterview.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstInterview[index];
    this.editInterviewForm.setValue({
      AddQuestion: toSetValues.questions,
      OptionA: toSetValues.option1,
      OptionB: toSetValues.option2,
      OptionC: toSetValues.option3,
      OptionD: toSetValues.option4,
      Correctanswer: toSetValues.correctanswer,
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
