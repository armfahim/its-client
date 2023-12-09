import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
@Component({
  selector: "app-goal-type",
  templateUrl: "./goal-type.component.html",
  styleUrls: ["./goal-type.component.css"],
})
export class GoalTypeComponent implements OnInit, OnDestroy {
  lstGoaltype: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "goaltype";

  public dtTrigger: Subject<any> = new Subject();
  public rows = [];
  public srch = [];

  public tempId: any;
  public editId: any;
  public addGoalTypeForm: FormGroup;
  public editGoalTypeForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.LoadGoaltype();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.addGoalTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });

    this.editGoalTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });
  }

  // Get  goal type  Api Call
  LoadGoaltype() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstGoaltype = data;
      this.dtTrigger.next();
      this.rows = this.lstGoaltype;
      this.srch = [...this.rows];
    });
  }

  // Add  goal type  Modal Api Call
  addGoalType() {
    if (this.addGoalTypeForm.valid) {
      let obj = {
        type: this.addGoalTypeForm.value.GoalType,
        description: this.addGoalTypeForm.value.Description,
        status: this.addGoalTypeForm.value.Status,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadGoaltype();
      $("#add_type").modal("hide");
      this.addGoalTypeForm.reset();
      this.toastr.success("Goal type added sucessfully...!", "Success");
    }
  }

  editGoalType() {
    if (this.editGoalTypeForm.valid) {
      let obj = {
        type: this.editGoalTypeForm.value.GoalType,
        description: this.editGoalTypeForm.value.Description,
        status: this.editGoalTypeForm.value.Status,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadGoaltype();
      $("#edit_type").modal("hide");
      this.toastr.success("Goal type Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstGoaltype.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstGoaltype[index];
    this.editGoalTypeForm.setValue({
      GoalType: toSetValues.type,
      Description: toSetValues.description,
      Status: toSetValues.status,
    });
  }

  deleteGoalType() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadGoaltype();
      $("#delete_type").modal("hide");
      this.toastr.success("Goal type deleted sucessfully..!", "Success");
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
