import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
@Component({
  selector: "app-policies-content",
  templateUrl: "./policies-content.component.html",
  styleUrls: ["./policies-content.component.css"],
})
export class PoliciesContentComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "policies";
  public allPolicies: any = [];
  public addPolicies: FormGroup;
  public editPolicies: FormGroup;
  public editId: any;
  public tempId: any;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPolicies();

    // Add Provident Form Validation And Getting Values

    this.addPolicies = this.formBuilder.group({
      addPolicyName: ["", [Validators.required]],
      addDepartment: ["", [Validators.required]],
      addDescription: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editPolicies = this.formBuilder.group({
      editPolicyName: ["", [Validators.required]],
      editDepartment: ["", [Validators.required]],
      editDescription: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getPolicies() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allPolicies = data;
      this.dtTrigger.next();
    });
  }

  // Add Provident Modal Api Call

  addPoliciesSubmit() {
    if (this.addPolicies.valid) {
      let obj = {
        policyName: this.addPolicies.value.addPolicyName,
        department: this.addPolicies.value.addDepartment,
        description: this.addPolicies.value.addDescription,
        createdDate: "20 Feb 2019",
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.allPolicies = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getPolicies();
      $("#add_policy").modal("hide");
      this.addPolicies.reset();
      this.toastr.success("Policy is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editPoliciesSubmit() {
    let obj = {
      policyName: this.editPolicies.value.editPolicyName,
      department: this.editPolicies.value.editDepartment,
      description: this.editPolicies.value.editDescription,
      createdDate: "20 Feb 2019",
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getPolicies();
    $("#edit_policy").modal("hide");
    this.toastr.success("Policy is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allPolicies.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allPolicies[index];
    this.editPolicies.setValue({
      editPolicyName: toSetValues.policyName,
      editDepartment: toSetValues.department,
      editDescription: toSetValues.description,
    });
  }

  // Delete Provident Modal Api Call

  deletePolicies() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getPolicies();
      $("#delete_policy").modal("hide");
      this.toastr.success("Policy is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
