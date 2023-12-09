import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
declare const $: any;

@Component({
  selector: 'app-budgetrevenues-list',
  templateUrl: './budgetrevenues-list.component.html',
  styleUrls: ['./budgetrevenues-list.component.css']
})
export class BudgetrevenuesListComponent implements OnInit {
	public url: any = "revenue";
  public tempId: any;
  public addRevenueForm: FormGroup;
  public lstRevenue;
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
      $("#add_revenue").modal("hide");
      this.addRevenueForm.reset();
      this.toastr.success("Budget-revenue added sucessfully...!", "Success");
    }
  }
  
    deleteRevenue() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      
      this.LoadRevenue();
      $("#delete").modal("hide");
      this.toastr.success("Budget-revenue deleted sucessfully..!", "Success");
    });
  }

}
