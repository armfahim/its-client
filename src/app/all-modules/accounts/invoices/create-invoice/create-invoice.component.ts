import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";

import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-create-invoice",
  templateUrl: "./create-invoice.component.html",
  styleUrls: ["./create-invoice.component.css"],
})
export class CreateInvoiceComponent implements OnInit {
  public addInvoiceForm: FormGroup;
  public total;
  public invoices;
  public id;
  public allInvoices;
  public invoiceNumber;
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
    //get id value of invoice list
    this.id = this.route.snapshot.queryParams["id"];

    //add invoive form
    this.addInvoiceForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      project: ["", [Validators.required]],
      email: ["", [Validators.required]],
      tax: ["", [Validators.required]],
      client_address: ["", [Validators.required]],
      billing_address: ["", [Validators.required]],
      invoice_date: ["", [Validators.required]],
      due_date: ["", [Validators.required]],
      other_information: ["", [Validators.required]],
      status: [""],
      totalamount: ["", [Validators.required]],
      discount: ["", [Validators.required]],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });

    //for adding row
    this.addItems();

    //for get all invoice
    this.getAllInvoices();
  }

  //for adding new array
  get itemsList(): FormArray {
    return this.addInvoiceForm.get("items") as FormArray;
  }

  // getting invoice
  getAllInvoices() {
    this.allModulesService.get("invoice").subscribe((res) => {
      this.invoices = res;
    });
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

  //for calculating amount
  changePrice(i) {
    let qty = this.itemsList.at(i).get("qty").value;
    let price = this.itemsList.at(i).get("unit_cost").value;
    let amount = Number(qty) * Number(price);
    this.itemsList.at(i).get("amount").patchValue(amount);
    let total = 0;
    this.addInvoiceForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.addInvoiceForm.get("totalamount").setValue(total);
    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.addInvoiceForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.addInvoiceForm.get("grandTotal").setValue(this.grandTotal);
  }

  addItems() {
    this.itemsList.push(this.newItem());
  }

  removeItems(i) {
    this.itemsList.removeAt(i);
  }

  savesend() {
    if (!this.addInvoiceForm.valid) {
      this.toastr.error("", "Please enter mandatory field!");
    } else {
      let invoiceDateFormat = this.pipe.transform(
        this.addInvoiceForm.value.invoice_date,
        "dd-MM-yyyy"
      );
      let dueDateFormat = this.pipe.transform(
        this.addInvoiceForm.value.due_date,
        "dd-MM-yyyy"
      );
      let getItems = this.addInvoiceForm.get("items").value;
      let amount = this.addInvoiceForm.value.totalamount.toString();
      let obj = {
        number: "#INV-0001",
        client: this.addInvoiceForm.value.client,
        project: this.addInvoiceForm.value.project,
        invoice_date: invoiceDateFormat,
        email: this.addInvoiceForm.value.email,
        tax: this.addInvoiceForm.value.tax,
        client_address: this.addInvoiceForm.value.client_address,
        due_date: dueDateFormat,
        billing_address: this.addInvoiceForm.value.billing_address,
        other_information: this.addInvoiceForm.value.other_information,
        status: "Pending",
        totalamount: amount,
        discount: this.addInvoiceForm.value.discount,
        grandTotal: this.addInvoiceForm.value.grandTotal,
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
      this.allModulesService.add(obj, "invoice").subscribe((res) => {
        this.toastr.success("", "Added successfully!");
        this.router.navigate(["/accounts/invoices"]);
      });
    }
  }
}
