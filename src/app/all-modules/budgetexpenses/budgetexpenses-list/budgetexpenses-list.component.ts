import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
declare const $: any;
@Component({
  selector: 'app-budgetexpenses-list',
  templateUrl: './budgetexpenses-list.component.html',
  styleUrls: ['./budgetexpenses-list.component.css']
})
export class BudgetexpensesListComponent implements OnInit {
public url: any = "budgetexpense";
public pipe = new DatePipe("en-US");
  public tempId: any;
  public editId: any;
  public addRevenueForm: FormGroup;
  public editRevenueForm: FormGroup;
  public lstRevenue;
  public editedvalue;
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
      RevenueName: ["", [Validators.required]],
      RevenueNotes: ["", [Validators.required]],
      RevenueDate: ["", [Validators.required]],
    });
     this.editRevenueForm = this.formBuilder.group({
      RevenueName: ["", [Validators.required]],
      RevenueNotes: ["", [Validators.required]],
      RevenueDate: ["", [Validators.required]],
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
        this.addRevenueForm.value.RevenueDate,
        "dd-MM-yyyy"
      );
      let obj = {
        amount: this.addRevenueForm.value.RevenueName,
        notes: this.addRevenueForm.value.RevenueNotes,
        revenuedate: purchaseToDateFormat,

        id: 0,
        subcategoryname: "Hardware expenses",
         categoryname: "Hardware",
      
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
       
      });
      this.LoadRevenue();
      $("#add_categories").modal("hide");
      this.addRevenueForm.reset();
      this.toastr.success("Budget-revenue added sucessfully...!", "Success");
    }
  }




  editRevenue() {
    if (this.editRevenueForm.valid) {
      let obj = {
        amount: this.editRevenueForm.value.RevenueName,
        notes: this.editRevenueForm.value.RevenueNotes,
        revenuedate: this.editRevenueForm.value.RevenueDate,
        id: this.editId,
        categoryname: "Hardware",
        subcategoryname: "Hardware Expenses",

      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        
      });
      this.LoadRevenue();
      $("#edit_categories").modal("hide");
      this.toastr.success("Expenses Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.amount
    this.editId = value.id;
    const index = this.lstRevenue.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstRevenue[index];
    this.editRevenueForm.setValue({
      RevenueName: toSetValues.amount,
      RevenueNotes: toSetValues.notes,
      RevenueDate: toSetValues.revenuedate,
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
