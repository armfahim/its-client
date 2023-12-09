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
  selector: "app-taxes",
  templateUrl: "./taxes.component.html",
  styleUrls: ["./taxes.component.css"],
})
export class TaxesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "taxes";
  public allTaxes: any = [];
  public addTaxes: FormGroup;
  public editTaxForm: FormGroup;
  public editId: any;
  public tempId: any;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTaxes();
    // Add Taxes Form Validation And Getting Values

    this.addTaxes = this.formBuilder.group({
      taxName: ["", [Validators.required]],
      taxpercentage: ["", [Validators.required]],
    });

    // Edit Taxes Form Validation And Getting Values

    this.editTaxForm = this.formBuilder.group({
      editTaxName: ["", [Validators.required]],
      editTaxPercentage: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getTaxes() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allTaxes = data;
      this.dtTrigger.next();
    });
  }

  // Add Taxes Modal Api Call

  addTaxSubmit() {
    if (this.addTaxes.valid) {
      let obj = {
        taxName: this.addTaxes.value.taxName,
        taxPercentage: this.addTaxes.value.taxpercentage,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getTaxes();
      $("#add_tax").modal("hide");
      this.addTaxes.reset();
      this.toastr.success("Tax is added", "Success");
    }
  }

  // Edit Taxes Modal Api Call

  editTaxSubmit() {
    let obj = {
      taxName: this.editTaxForm.value.editTaxName,
      taxPercentage: this.editTaxForm.value.editTaxPercentage,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getTaxes();
    $("#edit_tax").modal("hide");
    this.toastr.success("Tax is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allTaxes.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allTaxes[index];
    this.editTaxForm.setValue({
      editTaxName: toSetValues.taxName,
      editTaxPercentage: toSetValues.taxPercentage,
    });
  }

  // Delete Taxes Modal Api Call

  deleteTaxes() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getTaxes();
      $("#delete_tax").modal("hide");
      this.toastr.success("Tax is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
