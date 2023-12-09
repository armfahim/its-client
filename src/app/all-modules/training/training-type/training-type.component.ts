import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

declare const $: any;
@Component({
  selector: "app-training-type",
  templateUrl: "./training-type.component.html",
  styleUrls: ["./training-type.component.css"],
})
export class TrainingTypeComponent implements OnInit, OnDestroy {
  lstTrainingType: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  url: any = "trainingtype";

  public rows = [];
  public srch = [];
  public tempId: any;
  public editId: any;

  public addTrainingTypeForm: FormGroup;
  public editTrainingTypeForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadTrainingType();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.addTrainingTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });

    this.editTrainingTypeForm = this.formBuilder.group({
      GoalType: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Status: ["", [Validators.required]],
    });
  }

  // Get  goal type  Api Call
  loadTrainingType() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTrainingType = data;
      this.dtTrigger.next();
      this.rows = this.lstTrainingType;
      this.srch = [...this.rows];
    });
  }
  // Add  goal type  Modal Api Call
  addTrainingType() {
    if (this.addTrainingTypeForm.valid) {
      let obj = {
        type: this.addTrainingTypeForm.value.GoalType,
        description: this.addTrainingTypeForm.value.Description,
        status: this.addTrainingTypeForm.value.Status,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadTrainingType();
      $("#add_type").modal("hide");
      this.addTrainingTypeForm.reset();
      this.toastr.success("Training type added sucessfully...!", "Success");
    }
  }

  editTrainingType() {
    if (this.editTrainingTypeForm.valid) {
      let obj = {
        type: this.editTrainingTypeForm.value.GoalType,
        description: this.editTrainingTypeForm.value.Description,
        status: this.editTrainingTypeForm.value.Status,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadTrainingType();
      $("#edit_type").modal("hide");
      this.toastr.success("Training type Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTrainingType.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTrainingType[index];
    this.editTrainingTypeForm.setValue({
      GoalType: toSetValues.type,
      Description: toSetValues.description,
      Status: toSetValues.status,
    });
  }

  deleteTrainingType() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.loadTrainingType();
      $("#delete_type").modal("hide");
      this.toastr.success("Training type deleted sucessfully..!", "Success");
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
