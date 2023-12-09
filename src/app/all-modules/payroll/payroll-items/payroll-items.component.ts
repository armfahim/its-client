import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

declare const $: any;

@Component({
  selector: "app-payroll-items",
  templateUrl: "./payroll-items.component.html",
  styleUrls: ["./payroll-items.component.css"],
})
export class PayrollItemsComponent implements OnInit {
  // dtOptions: DataTables.Settings = {};
  public urlAdd: any = "payrollAddition";
  public urlOver: any = "payrollOvertime";
  public urlDeduct: any = "payrollDeduction";
  public allAddPayroll: any = [];
  public allOverPayroll: any = [];
  public allDeductPayroll: any = [];
  public addPayrollForm: FormGroup;
  public addOverForm: FormGroup;
  public addDeductForm: FormGroup;
  public editPayrollForm: FormGroup;
  public editOverForm: FormGroup;
  public editDeductForm: FormGroup;
  public editAddId: any;
  public editOverId: any;
  public editDeductId: any;
  public tempAddId: any;
  public tempOverId: any;
  public tempDeductId: any;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    //get add payroll
    this.getAddPayroll();

    //get over payroll
    this.getOverpayroll();

    //get deduct payroll
    this.getDeductPayroll();

    // Add payroll Form Validation And Getting Values

    this.addPayrollForm = this.formBuilder.group({
      addPayrollName: ["", [Validators.required]],
      addPayrollCategory: ["", [Validators.required]],
      addPayrollUnit: ["", [Validators.required]],
    });

    // Edit payroll Form Validation And Getting Values

    this.editPayrollForm = this.formBuilder.group({
      editPayrollName: ["", [Validators.required]],
      editPayrollCategory: ["", [Validators.required]],
      editPayrollUnit: ["", [Validators.required]],
    });

    // Add overTime Form Validation And Getting Values

    this.addOverForm = this.formBuilder.group({
      addOverName: ["", [Validators.required]],
      addOverRate: ["", [Validators.required]],
    });

    // Edit overtime Form Validation And Getting Values

    this.editOverForm = this.formBuilder.group({
      editOverName: ["", [Validators.required]],
      editOverRate: ["", [Validators.required]],
    });

    // Add deduction Form Validation And Getting Values

    this.addDeductForm = this.formBuilder.group({
      addDeductName: ["", [Validators.required]],
      addDeductUnit: ["", [Validators.required]],
    });

    // Edit deduction Form Validation And Getting Values

    this.editDeductForm = this.formBuilder.group({
      editDeductName: ["", [Validators.required]],
      editDeductunit: ["", [Validators.required]],
    });

    // //data table configuration
    // this.dtOptions = {
    //   // ... skipped ...
    //   dom: "lrtip",
    // };
  }

  // get payroll
  getAddPayroll() {
    this.allModuleService.get(this.urlAdd).subscribe((data) => {
      this.allAddPayroll = data;
      $("#datatable1").DataTable().clear();
    });
  }

  // get overtime
  getOverpayroll() {
    this.allModuleService.get(this.urlOver).subscribe((data) => {
      this.allOverPayroll = data;
      $("#datatable2").DataTable().clear();
    });
  }

  // get deducts
  getDeductPayroll() {
    this.allModuleService.get(this.urlDeduct).subscribe((data) => {
      this.allDeductPayroll = data;
      $("#datatable3").DataTable().clear();
    });
  }

  // Add payroll Modal Api Call

  addPayroll() {
    if (this.addPayrollForm.valid) {
      let obj = {
        name: this.addPayrollForm.value.addPayrollName,
        category: this.addPayrollForm.value.addPayrollCategory,
        unitCost: this.addPayrollForm.value.addPayrollUnit,
      };
      this.allModuleService.add(obj, this.urlAdd).subscribe((data) => {});
      this.getAddPayroll();
      $("#add_addition").modal("hide");
      this.addPayrollForm.reset();
      this.toastr.success("Payroll added", "Success");
    }
  }

  // Edit payroll Modal Api Call

  editPayroll() {
    let obj = {
      name: this.editPayrollForm.value.editPayrollName,
      category: this.editPayrollForm.value.editPayrollCategory,
      unitCost: this.editPayrollForm.value.editPayrollUnit,
      id: this.editAddId,
    };
    this.allModuleService.update(obj, this.urlAdd).subscribe((data1) => {});
    this.getAddPayroll();
    $("#edit_addition").modal("hide");
    this.toastr.success("Payroll edited", "Success");
  }

  editAdd(value) {
    this.editAddId = value;
    const index = this.allAddPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allAddPayroll[index];
    this.editPayrollForm.setValue({
      editPayrollName: toSetValues.name,
      editPayrollCategory: toSetValues.category,
      editPayrollUnit: toSetValues.unitCost,
    });
  }

  // Delete payroll Modal Api Call

  deletePayroll() {
    this.allModuleService
      .delete(this.tempAddId, this.urlAdd)
      .subscribe((data) => {
        this.getAddPayroll();
        $("#delete_addition").modal("hide");
      });
    this.toastr.success("Payroll deleted", "Success");
  }

  // Add overtime Modal Api Call

  addOver() {
    if (this.addOverForm.valid) {
      let obj = {
        name: this.addOverForm.value.addOverName,
        rate: this.addOverForm.value.addOverRate,
      };
      this.allModuleService.add(obj, this.urlOver).subscribe((data) => {});
      this.getOverpayroll();
      $("#add_overtime").modal("hide");
      this.addOverForm.reset();
      this.toastr.success("Overtime added", "Success");
    }
  }

  // Edit overtime Modal Api Call

  editOverSubmit() {
    let obj = {
      name: this.editOverForm.value.editOverName,
      rate: this.editOverForm.value.editOverRate,
      id: this.editOverId,
    };
    this.allModuleService.update(obj, this.urlOver).subscribe((data1) => {});
    this.getOverpayroll();
    $("#edit_overtime").modal("hide");
    this.toastr.success("Overtime edited", "Success");
  }

  editOver(value) {
    this.editOverId = value;
    const index = this.allOverPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allOverPayroll[index];
    this.editOverForm.setValue({
      editOverName: toSetValues.name,
      editOverRate: toSetValues.rate,
    });
  }

  // Delete overtime Modal Api Call

  deleteOver() {
    this.allModuleService
      .delete(this.tempOverId, this.urlOver)
      .subscribe((data) => {
        this.getOverpayroll();
        $("#delete_overtime").modal("hide");
      });
    this.toastr.success("Overtime deleted", "Success");
  }

  // Add deduction Modal Api Call

  addDeducts() {
    if (this.addDeductForm.valid) {
      let obj = {
        name: this.addDeductForm.value.addDeductName,
        unitCost: this.addDeductForm.value.addDeductUnit,
      };
      this.allModuleService.add(obj, this.urlDeduct).subscribe((data) => {});
      this.getDeductPayroll();
      $("#add_deduction").modal("hide");
      this.addDeductForm.reset();
      this.toastr.success("Deduction added", "Success");
    }
  }

  // Edit deduction Modal Api Call

  editDeductSubmit() {
    let obj = {
      name: this.editDeductForm.value.editDeductName,
      unitCost: this.editDeductForm.value.editDeductunit,
      id: this.editDeductId,
    };
    this.allModuleService.update(obj, this.urlDeduct).subscribe((data1) => {});
    this.getDeductPayroll();
    $("#edit_deduction").modal("hide");
    this.toastr.success("Deducts edited", "Success");
  }
  editDeduct(value) {
    this.editDeductId = value;
    const index = this.allDeductPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allDeductPayroll[index];
    this.editDeductForm.setValue({
      editDeductName: toSetValues.name,
      editDeductunit: toSetValues.unitCost,
    });
  }

  // Delete deduction Modal Api Call

  deleteDeduct() {
    this.allModuleService
      .delete(this.tempDeductId, this.urlDeduct)
      .subscribe((data) => {
        this.getDeductPayroll();
        $("#delete_deduction").modal("hide");
      });
    this.toastr.success("Deduction deleted", "Success");
  }
}
