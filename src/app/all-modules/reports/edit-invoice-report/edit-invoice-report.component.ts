import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-edit-invoice-report",
  templateUrl: "./edit-invoice-report.component.html",
  styleUrls: ["./edit-invoice-report.component.css"],
})
export class EditInvoiceReportComponent implements OnInit {
  public id;
  public allInvoices;
  public editInvoiceForm: FormGroup;
  public total;
  public pipe = new DatePipe("en-US");
  public editId: any;
  public dateStatus = false;
  public estimateDateFormat;
  public expiryToDateFormat;
  public tax = 5;
  public percentageTaxValue;
  public grandTotal;
  public totalTax;
  public percentageDiscountValue;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    //getting edit id of selected estimate list
    this.id = parseInt(this.route.snapshot.queryParams["id"]);

    //editestimate form value
    this.editInvoiceForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      project: [""],
      email: [""],
      tax: [""],
      client_address: [""],
      billing_address: [""],
      invoice_date: [""],
      due_date: [""],
      other_information: [""],
      status: [],
      totalamount: "",
      discount: ["", [Validators.required]],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });
    //get estimates
    this.getEstimate();

    //adding items
    this.addItems();
  }

  // get method for estimate
  getEstimate() {
    this.allModulesService.get("invoiceReport").subscribe((res) => {
      this.allInvoices = res;

      //passing edit id

      this.edit(this.id);
    });
  }

  //for adding new rows
  get itemsList(): FormArray {
    return this.editInvoiceForm.get("items") as FormArray;
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

  //for calculating changing price
  changePrice(i) {
    let qty = this.itemsList.at(i).get("qty").value;
    let price = this.itemsList.at(i).get("unit_cost").value;
    let amount = Number(qty) * Number(price);
    this.itemsList.at(i).get("amount").patchValue(amount);
    let total = 0;
    this.editInvoiceForm.get("items").value.forEach((index) => {
      total += index.amount;
    });
    this.total = total;
    this.editInvoiceForm.get("totalamount").setValue(total);
    this.percentageTaxValue = (this.total * Number(this.tax)) / 100;
    this.percentageDiscountValue =
      (this.total * Number(this.editInvoiceForm.value.discount)) / 100;

    this.grandTotal =
      Number(this.total) +
      Number(this.percentageTaxValue) -
      Number(this.percentageDiscountValue);
    this.editInvoiceForm.get("grandTotal").setValue(this.grandTotal);
  }

  // to know the date picker changes
  selected(data) {
    this.dateStatus = data;
  }

  // for edit data using update method
  savesend() {
    if (!this.editInvoiceForm.valid) {
      this.toastr.error("", "Please enter mandatory field!");
    } else {
      let params = this.editInvoiceForm.value;
      params["status"] = 0;
      params["id"] = 2;
      if (this.dateStatus) {
        this.estimateDateFormat = this.pipe.transform(
          this.editInvoiceForm.value.invoice_date,
          "dd-MM-yyyy"
        );
        this.expiryToDateFormat = this.pipe.transform(
          this.editInvoiceForm.value.due_date,
          "dd-MM-yyyy"
        );
      } else {
        this.estimateDateFormat = this.editInvoiceForm.value.invoice_date;
        this.expiryToDateFormat = this.editInvoiceForm.value.due_date;
      }

      let getItems = this.editInvoiceForm.get("items").value;
      let amount = this.editInvoiceForm.value.totalamount.toString();
      let obj = {
        number: "#INV-0001",
        client: this.editInvoiceForm.value.client,
        project: this.editInvoiceForm.value.project,
        invoice_date: this.estimateDateFormat,
        email: this.editInvoiceForm.value.email,
        tax: this.editInvoiceForm.value.tax,
        client_address: this.editInvoiceForm.value.client_address,
        due_date: this.expiryToDateFormat,
        billing_address: this.editInvoiceForm.value.billing_address,
        other_information: this.editInvoiceForm.value.other_information,
        status: "Pending",
        totalamount: amount,
        id: this.id,
        discount: this.editInvoiceForm.value.discount,
        grandTotal: this.editInvoiceForm.value.grandTotal,
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

      this.allModulesService.update(obj, "invoiceReport").subscribe((res) => {
        this.router.navigate(["/reports/invoice-report"]);
        this.toastr.success("", "Edited successfully!");
      });
    }
  }

  //remove row from table
  removeItems(i) {
    this.itemsList.removeAt(i);
  }

  // set values to form
  edit(value) {
    this.editId = value;
    const index = this.allInvoices.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allInvoices[index];
    this.editInvoiceForm.setValue({
      client: toSetValues.client,
      project: toSetValues.project,
      email: toSetValues.email,
      tax: toSetValues.tax,
      client_address: toSetValues.client_address,
      billing_address: toSetValues.billing_address,
      invoice_date: toSetValues.invoice_date,
      due_date: toSetValues.due_date,
      other_information: toSetValues.other_information,
      status: toSetValues.status,
      totalamount: toSetValues.totalamount,
      discount: toSetValues.discount,
      grandTotal: toSetValues.grandTotal,
      items: [
        {
          item: toSetValues.items[0].item,
          description: toSetValues.items[0].description,
          unit_cost: toSetValues.items[0].unit_cost,
          qty: toSetValues.items[0].qty,
          amount: toSetValues.items[0].amount,
        },
      ],
    });
  }
}
