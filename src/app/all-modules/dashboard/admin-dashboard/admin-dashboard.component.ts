import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { Invoice } from "../../model/invoice";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvoiceService } from "../../services/invoice.service";
import { HttpClient } from "@angular/common/http";
import { WhiteSpaceValidator } from "src/app/utils/white-space-validator";

declare const $: any;
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {

  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#667eea",
    b: "#764ba2",
  };
  public lineColors = {
    a: "#667eea",
    b: "#764ba2",
  };

  totalNoOfSuppliers:any;
  totalNoOfinvoices:any;
  pendingInvoices:any;
  dueInvoices:any;
  days:any;
  netDueOfDueInvoices:any;
  netDueOfPendingInvoices:any;
  totalDueAmount: any;
  searchFeature:any;
  searchFeaturePending:any;
  dashboardResponse:any;

  //Model
  invoiceObj: Invoice = new Invoice();
  dueInvoiceObj: Invoice = new Invoice();
  pendingInvoiceObj: Invoice = new Invoice();
  public dueInvoicesData: any;
  public pendingInvoicesData: any;
  loading = false;
  public editInvoiceForm: FormGroup;
  public editedInvoice;

  constructor(
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private invoiceService: InvoiceService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.days = 1
    this.dashboardHighlights();
    this.getPendingInvoices();

  //Edit voice Form
  this.editInvoiceForm = this.formBuilder.group({
    editChequeNumber: ["", []],
    editIsPaid: ["", []],
    editPaidDate: ["", []],
    editId: ["", []],
    editInvoiceDesc: ["", [WhiteSpaceValidator]],
    editDueDate: ["", []],
  });
  }

  setDays(val: string) {
    this.days = val;
    this.getPendingInvoices();
  }

  dashboardHighlights() {
    let params = {
      days : this.days
    };
    this.allModulesService.get("/v1/dashboard/highlights").subscribe((response: any) => {
      this.dueInvoices = response?.data.dueInvoices;
      this.dueInvoicesData = this.dueInvoices;

      this.totalNoOfinvoices = response?.data.totalInvoices;
      this.totalNoOfSuppliers = response?.data.totalSuppliers;
      this.dashboardResponse = response?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  getPendingInvoices() {
    let params = {
      days : this.days
    };
    this.allModulesService.getPendingInvoices("/v1/dashboard/pending-invoices",params).subscribe((response: any) => {
      this.pendingInvoices = response?.data;
      this.pendingInvoicesData = this.pendingInvoices;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  // On Set Edit invoice
  public onDueInvoice(invoiceId: any) {
    let invoice = this.dueInvoicesData.filter((invoice) => invoice.id === invoiceId);
    this.dueInvoiceObj = invoice[0];
    this.invoiceObj = invoice[0];
    console.log(this.invoiceObj);
    this.setValue(invoice);
  }

  // On Set Edit invoice
  public onPendingInvoice(invoiceId: any) {
    let invoice = this.pendingInvoicesData.filter((invoice) => invoice.id === invoiceId);
    this.pendingInvoiceObj = invoice[0];
    this.invoiceObj = invoice[0];
    console.log(this.invoiceObj);

    this.setValue(invoice);
  }

  setValue(invoice) {
    this.editInvoiceForm.setValue({
      editChequeNumber: invoice[0]?.chequeNumber ? invoice[0]?.chequeNumber : null,
      editIsPaid: invoice[0]?.isPaid == true ? invoice[0]?.isPaid : false,
      editPaidDate: invoice[0]?.paidDate ? invoice[0]?.paidDate : null,
      editInvoiceDesc: invoice[0]?.invoiceDesc ? invoice[0]?.invoiceDesc : null,
      editId: invoice[0]?.id,
      editDueDate: invoice[0]?.paymentDueDate
    });
    console.log(this.editInvoiceForm);
  }

  // Update Invoice - api calling
  public onEditInvoice() {
    this.loading = true;
    this.editedInvoice = {
      invoiceDesc: this.editInvoiceForm.value.editInvoiceDesc,
      chequeNumber: this.editInvoiceForm.value.editChequeNumber,
      paidDate: this.editInvoiceForm.value.editPaidDate,
      id: this.editInvoiceForm.value.editId,
      isPaid: this.editInvoiceForm.value.editIsPaid
    };
    if(this.editedInvoice.isPaid == false) {
      this.toastr.info("Please checked the Paid first!","",{ timeOut: 5000 })
      this.loading = false;
      return;
    };
    var datePipe = new DatePipe('en-US');
    this.editedInvoice.paidDate = datePipe.transform( this.editedInvoice.paidDate, 'MM-dd-yyyy');

    this.allModulesService
      .update(this.editedInvoice, "/v1/invoice-details/update-payment-status")
      .subscribe((data) => {
        this.loading = false;
        $("#edit_invoice").modal("hide");
        this.editInvoiceForm.reset();
        this.toastr.success("The invoice is paid now!", "Success",{ timeOut: 5000 });
        this.dashboardHighlights();
        this.getPendingInvoices();
      },
      (error) => {
        this.loading = false;
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.info(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

}
