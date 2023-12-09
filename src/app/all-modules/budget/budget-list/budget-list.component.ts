import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
declare const $: any;
@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
public url: any = "budget";
  public tempId: any;
  public editId: any;
  public addRevenueForm: FormGroup;
  public editRevenueForm: FormGroup;
  public lstRevenue;
  public editedvalue;
   public pipe = new DatePipe("en-US");
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
  	this.LoadRevenue();

    this.addRevenueForm = this.formBuilder.group({
      BudgetTitle: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      Tax: ["", [Validators.required]],
    });
     this.editRevenueForm = this.formBuilder.group({
      BudgetTitle: ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      Tax: ["", [Validators.required]],
    });
  }
  // Get department list  Api Call
  LoadRevenue() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstRevenue = data;
      });
  }
     // Add Department  Modal Api Call
  addRevenue() {
    if (this.addRevenueForm.valid) {
       let purchaseToDateFormat = this.pipe.transform(
        this.addRevenueForm.value.StartDate,
        "dd-MM-yyyy"
      );
        let purchaseToDateFormat1 = this.pipe.transform(
        this.addRevenueForm.value.EndDate,
        "dd-MM-yyyy"
      );
      let obj = {
        budgettitle: this.addRevenueForm.value.BudgetTitle,
        startdate: purchaseToDateFormat,
        enddate: purchaseToDateFormat1,
        taxamount: this.addRevenueForm.value.Tax,
        id: 0,
        budgettype: "project",
        totalrevenue: "2500000",
        totalexpenses: "1500000",
        budgetamount: "999990",
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
       
      });
      this.LoadRevenue();
      $("#add_categories").modal("hide");
      this.addRevenueForm.reset();
      this.toastr.success("Budget-list added sucessfully...!", "Success");
    }
  }

  editRevenue() {
    if (this.editRevenueForm.valid) {
      let obj = {
        budgettitle: this.editRevenueForm.value.BudgetTitle,
        startdate: this.editRevenueForm.value.StartDate,
        enddate: this.editRevenueForm.value.EndDate,
        taxamount: this.editRevenueForm.value.Tax,
        id: this.editId,
        budgettype: "project",
        totalrevenue: "2500000",
        totalexpenses: "1500000",
        budgetamount: "999990",


      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        
      });
      this.LoadRevenue();
      $("#edit_categories").modal("hide");
      this.toastr.success("Budget-list Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.budgettitle
    this.editId = value.id;
    const index = this.lstRevenue.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstRevenue[index];
    this.editRevenueForm.setValue({
      BudgetTitle: toSetValues.budgettitle,
      StartDate: toSetValues.startdate,
      EndDate: toSetValues.enddate,
      Tax: toSetValues.taxamount,
    });
  }
     deleteRevenue() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      
      this.LoadRevenue();
      $("#delete").modal("hide");
      this.toastr.success("Budget-revenue deleted sucessfully..!", "Success");
    });
  }

}
