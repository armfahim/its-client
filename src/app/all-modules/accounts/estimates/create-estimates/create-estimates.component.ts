import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";

import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-create-estimates",
  templateUrl: "./create-estimates.component.html",
  styleUrls: ["./create-estimates.component.css"],
})
export class CreateEstimatesComponent implements OnInit {
  public estimate;
  public addEstimateForm: FormGroup;
  public id;
  public allEstimates = [];
  public total;
  public pipe = new DatePipe("en-US");
  public discount;
  public tax = 5;
  public totalPercentage;
  public percentageTaxValue;
  public percentageDiscountValue;
  public grandTotal;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //get id value of estimation list
    this.id = this.route.snapshot.queryParams["id"];

    // add estimation form value
    this.addEstimateForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      project: ["", [Validators.required]],
      email: ["", [Validators.required]],
      tax: ["", [Validators.required]],
      client_address: ["", [Validators.required]],
      billing_address: ["", [Validators.required]],
      estimate_date: ["", [Validators.required]],
      expiry_date: ["", [Validators.required]],
      other_information: [""],
      status: [""],
      totalamount: ["", [Validators.required]],
      discount: [""],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });

    //adding new rows to table
    this.addItems();
    //get estimation
    this.getEstimate();
  }

  //getting estimate
  getEstimate() {
    this.allModulesService.get("estimates").subscribe((res) => {
      this.allEstimates = res;
    });
  }

  //for adding new array

  get itemsList(): FormArray {
    return this.addEstimateForm.get("items") as FormArray;
  }

  newItem(): FormGroup {
    return this.formBuilder.group({
      item: "",
      description: "",
      unit_cost: "",
      qty: "",
      amount: "",
    });
  }

  addItems() {
    this.itemsList.push(this.newItem());
  }

  //for calculating price values

  changePrice(i) {
    let qty = this.itemsList.at(i).get("qty").value;
    let price = this.itemsList.at(i).get("unit_cost").value;
    let amount = Number(qty) * Number(price);
    this.itemsList.at(i).get("amount").patchValue(amount);
    let total = 0;
    this.addEstimateForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.addEstimateForm.get("totalamount").setValue(total);
    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.addEstimateForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.addEstimateForm.get("grandTotal").setValue(this.grandTotal);
  }

  //post method function for estimate form

  savesend() {
    if (!this.addEstimateForm.valid) {
      this.toastr.error("", "Please enter mandatory field!");
    } else {
      let estimateDateFormat = this.pipe.transform(
        this.addEstimateForm.value.estimate_date,
        "dd-MM-yyyy"
      );
      let expiryToDateFormat = this.pipe.transform(
        this.addEstimateForm.value.expiry_date,
        "dd-MM-yyyy"
      );
      let getItems = this.addEstimateForm.get("items").value;
      let amount = this.addEstimateForm.value.totalamount.toString();
      let obj = {
        number: "EST-0001",
        client: this.addEstimateForm.value.client,
        project: this.addEstimateForm.value.project,
        estimate_date: estimateDateFormat,
        email: this.addEstimateForm.value.email,
        tax: this.addEstimateForm.value.tax,
        client_address: this.addEstimateForm.value.client_address,
        expiry_date: expiryToDateFormat,
        billing_address: this.addEstimateForm.value.billing_address,
        other_information: this.addEstimateForm.value.other_information,
        status: "Declined",
        totalamount: amount,
        discount: this.addEstimateForm.value.discount,
        grandTotal: this.addEstimateForm.value.grandTotal,
        items: [
          {
            item: getItems[0].item,
            description: getItems[0].description,
            unit_cost: getItems[0].unit_cost,
            qty: getItems[0].qty,
            amount: getItems[0].amount,
          },
        ],
      };
      this.allModulesService.add(obj, "estimates").subscribe((res) => {
        this.toastr.success("", "Added successfully!");
        this.router.navigate(["/accounts/estimates"]);
      });
    }
  }

  //removing rows from table

  removeItems(i) {
    this.itemsList.removeAt(i);
  }
}
