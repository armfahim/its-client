import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

declare const $: any;
@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.css"],
})
export class TrainersComponent implements OnInit, OnDestroy {
  lstTrainer: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  url: any = "trainers";

  public rows = [];
  public srch = [];
  public tempId: any;
  public editId: any;

  public addTrainerForm: FormGroup;
  public editTrainerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadtrainer();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addTrainerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      RoleName: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });

    this.editTrainerForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      RoleName: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      StatusName: ["", [Validators.required]],
    });
  }

  // Get  trainer Api Call
  loadtrainer() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTrainer = data;
      this.dtTrigger.next();
      this.rows = this.lstTrainer;
      this.srch = [...this.rows];
    });
  }
  // Add  goal type  Modal Api Call
  addTrainer() {
    if (this.addTrainerForm.valid) {
      let obj = {
        name: this.addTrainerForm.value.firstName,
        lname: this.addTrainerForm.value.lastName,
        mail: this.addTrainerForm.value.Email,
        role: this.addTrainerForm.value.RoleName,
        contactNumber: this.addTrainerForm.value.phoneNumber,
        description: this.addTrainerForm.value.Description,
        status: this.addTrainerForm.value.StatusName,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadtrainer();
      $("#add_trainer").modal("hide");
      this.addTrainerForm.reset();
      this.toastr.success("Trainer added sucessfully...!", "Success");
    }
  }

  editTrainer() {
    if (this.editTrainerForm.valid) {
      let obj = {
        name: this.editTrainerForm.value.firstName,
        lname: this.editTrainerForm.value.lastName,
        mail: this.editTrainerForm.value.Email,
        role: this.editTrainerForm.value.RoleName,
        contactNumber: this.editTrainerForm.value.phoneNumber,
        description: this.editTrainerForm.value.Description,
        status: this.editTrainerForm.value.StatusName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadtrainer();
      $("#edit_trainer").modal("hide");
      this.toastr.success("Trainer Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTrainer.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTrainer[index];
    this.editTrainerForm.setValue({
      firstName: toSetValues.name,
      lastName: toSetValues.lname,
      Email: toSetValues.mail,
      RoleName: toSetValues.role,
      phoneNumber: toSetValues.contactNumber,
      Description: toSetValues.description,
      StatusName: toSetValues.status,
    });
  }
  deleteTrainer() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.loadtrainer();
      $("#delete_trainer").modal("hide");
      this.toastr.success("Trainer deleted sucessfully..!", "Success");
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
