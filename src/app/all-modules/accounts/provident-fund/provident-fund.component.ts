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
  selector: "app-provident-fund",
  templateUrl: "./provident-fund.component.html",
  styleUrls: ["./provident-fund.component.css"],
})
export class ProvidentFundComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "providentFund";
  public allProvidentfund: any = [];
  public addProvidentfund: FormGroup;
  public editProvidentForm: FormGroup;
  public editId: any;
  public tempId: any;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getProvidentfund();

    // Add Provident Form Validation And Getting Values

    this.addProvidentfund = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      providentType: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editProvidentForm = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      providentType: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getProvidentfund() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allProvidentfund = data;
      this.dtTrigger.next();
    });
  }

  // Add Provident Modal Api Call

  addProvident() {
    if (this.addProvidentfund.valid) {
      let obj = {
        employeeName: this.addProvidentfund.value.employeeName,
        providentFundType: this.addProvidentfund.value.providentType,
        employeeShare: this.addProvidentfund.value.employeeShare,
        organizationShare: this.addProvidentfund.value.organisationShare,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getProvidentfund();
      $("#add_pf").modal("hide");
      this.addProvidentfund.reset();
      this.toastr.success("Provident fund is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editProvident() {
    let obj = {
      employeeName: this.editProvidentForm.value.employeeName,
      providentFundType: this.editProvidentForm.value.providentType,
      employeeShare: this.editProvidentForm.value.employeeShare,
      organizationShare: this.editProvidentForm.value.organisationShare,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getProvidentfund();
    $("#edit_pf").modal("hide");
    this.toastr.success("Provident fund is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allProvidentfund.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allProvidentfund[index];
    this.editProvidentForm.setValue({
      employeeName: toSetValues.employeeName,
      providentType: toSetValues.providentFundType,
      employeeShare: toSetValues.employeeShare,
      organisationShare: toSetValues.organizationShare,
    });
  }

  // Delete Provident Modal Api Call

  deleteProvident() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getProvidentfund();
      $("#delete_pf").modal("hide");
      this.toastr.success("Tax is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
