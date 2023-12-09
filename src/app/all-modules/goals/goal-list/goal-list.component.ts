import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
@Component({
  selector: "app-goal-list",
  templateUrl: "./goal-list.component.html",
  styleUrls: ["./goal-list.component.css"],
})
export class GoalListComponent implements OnInit, OnDestroy {
  lstGoal: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "goallist";

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public tempId: any;
  public editId: any;
  public addGoalForm: FormGroup;
  public editGoalForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.LoadGoal();

    this.addGoalForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Subject: ["", [Validators.required]],
      TargetAchivement: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });

    this.editGoalForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Subject: ["", [Validators.required]],
      TargetAchivement: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // Get goallist  Api Call
  LoadGoal() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstGoal = data;
      this.dtTrigger.next();
      this.rows = this.lstGoal;
      this.srch = [...this.rows];
    });
  }

  // Add Department  Modal Api Call
  addGoal() {
    if (this.addGoalForm.valid) {
      let StartDatetime = this.pipe.transform(
        this.addGoalForm.value.StartDate,
        "dd-MM-yyyy"
      );
      let EndDatetime = this.pipe.transform(
        this.addGoalForm.value.EndDate,
        "dd-MM-yyyy"
      );
      let obj = {
        goalType: this.addGoalForm.value.GoalType,
        subject: this.addGoalForm.value.Subject,
        targetAchivement: this.addGoalForm.value.TargetAchivement,
        startDate: StartDatetime,
        endDate: EndDatetime,
        description: this.addGoalForm.value.Description,
        status: this.addGoalForm.value.Status,
        progress: "Completed 73%",
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadGoal();
      $("#add_goal").modal("hide");
      this.addGoalForm.reset();
      this.toastr.success("Goal added sucessfully...!", "Success");
    }
  }

  editGoal() {
    if (this.editGoalForm.valid) {
      let StartDatetime = this.pipe.transform(
        this.editGoalForm.value.StartDate,
        "dd-MM-yyyy"
      );
      let EndDatetime = this.pipe.transform(
        this.editGoalForm.value.EndDate,
        "dd-MM-yyyy"
      );
      let obj = {
        goalType: this.editGoalForm.value.GoalType,
        subject: this.editGoalForm.value.Subject,
        targetAchivement: this.editGoalForm.value.TargetAchivement,
        startDate: StartDatetime,
        endDate: EndDatetime,
        description: this.editGoalForm.value.Description,
        status: this.editGoalForm.value.Status,
        progress: "Completed 73%",
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadGoal();
      $("#edit_goal").modal("hide");
      this.toastr.success("Goal Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstGoal.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstGoal[index];
    this.editGoalForm.setValue({
      GoalType: toSetValues.goalType,
      Subject: toSetValues.subject,
      TargetAchivement: toSetValues.targetAchivement,
      StartDate: toSetValues.startDate,
      EndDate: toSetValues.endDate,
      Description: toSetValues.description,
      Status: toSetValues.status,
    });
  }

  deleteGoal() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadGoal();
      $("#delete_goal").modal("hide");
      this.toastr.success("Goal deleted sucessfully..!", "Success");
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
