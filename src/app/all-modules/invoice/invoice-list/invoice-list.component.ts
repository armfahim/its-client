import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../model/invoice';
import { WhiteSpaceValidator } from 'src/app/utils/white-space-validator';
import { InvoiceService } from '../../services/invoice.service';
import { RecordStatus } from 'src/app/utils/enums.enum';

declare const $: any;
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit,OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public invoicesData: any;

  public editedInvoice;
  public addInvoiceForm: FormGroup;
  public editInvoiceForm: FormGroup;
  public tempId: any;
  public companiesList = [];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  //Model
  invoice: Invoice = new Invoice();
  //obj declaration
  suppliers: [] = [];
  term: [] = [];

  // Properties for dynamic column sorting
  orderColumnIndex: number = 0;
  orderColumnName: string = "";

  //Search Form
  searchForm: FormGroup;
  searchFormData : any;
  searchSupplierId: any;
  fromInvoiceDate:any;
  toInvoiceDate:any;


  constructor(
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private invoiceService: InvoiceService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    var that = this;
    this.dtOptions = {
      // ... skipped ...
        pageLength: 10,
        dom: "lrtip",
        ordering: true,
        serverSide: true,
        processing: true,
        searching:true,
        ajax: (dataTablesParameters: any, callback) => {
          // dataTablesParameters.orderColumnIndex = this.orderColumnIndex;
          dataTablesParameters.orderColumnName = this.orderColumnName;
          dataTablesParameters.supplier = this.searchSupplierId ? this.searchSupplierId : "";
          dataTablesParameters.fromInvoiceDate = this.datePipe.transform(this.fromInvoiceDate, 'yyyy-MM-dd') ? this.datePipe.transform(this.fromInvoiceDate, 'yyyy-MM-dd') : "";
          dataTablesParameters.toInvoiceDate = this.datePipe.transform(this.toInvoiceDate, 'yyyy-MM-dd') ? this.datePipe.transform(this.toInvoiceDate, 'yyyy-MM-dd') : "";
          this.invoiceService.getPaginatedData("/v1/invoice-details/list",dataTablesParameters).subscribe(resp => {
          this.invoicesData = resp?.data;
          this.rows = this.invoicesData;
          this.srch = [...this.rows];
              callback({
                recordsTotal: resp.meta.total,
                recordsFiltered: resp.meta.total,
                data: []  // set data
              });
            },
            (error) => {
              console.error("API Error:", error);
              // Extract error message from the API response
              const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
              this.toastr.error(customErrorMessage, "Error",{ timeOut: 5000 });
              return;
            });
        },
    };

    //Add invoice form
    this.addInvoiceForm = this.formBuilder.group({
      invoiceNumber: ["", [Validators.required,WhiteSpaceValidator]],
      invoiceDesc: ["", [WhiteSpaceValidator]],
      invoiceDate: ["", [Validators.required]],
      term: ["", [Validators.required]],
      paymentDueDate: ["", [Validators.required]],
      invoiceAmount: ["", [Validators.required]],
      creditAmount: ["", [Validators.required]],
      netDue: ["", [Validators.required]],
      chequeNumber: ["", [Validators.required,WhiteSpaceValidator]],
      isPaid: ["", []],
      paidDate: ["", []],
      supplierDetails: ["", [Validators.required]],
    });
    this.addInvoiceForm.get("paymentDueDate").disable();
    this.addInvoiceForm.get("netDue").disable();

    //Edit voice Form
    this.editInvoiceForm = this.formBuilder.group({
      editInvoiceNumber: ["", [Validators.required]],
      editInvoiceDesc: ["", [WhiteSpaceValidator]],
      editInvoiceDate: ["", [Validators.required]],
      editTerm: ["", [Validators.required]],
      editPaymentDueDate: ["", [Validators.required]],
      editInvoiceAmount: ["", [Validators.required]],
      editCreditAmount: ["", [Validators.required]],
      editNetDue: ["", [Validators.required]],
      editChequeNumber: ["", [Validators.required]],
      editIsPaid: ["", []],
      editPaidDate: ["", []],
      editSupplierDetails: ["", [Validators.required]],
      editId: ["", []],
    });

    // Search Form
    this.searchForm = this.formBuilder.group({
      supplierId:["",[]],
      fromInvoiceDate:["",[]],
      toInvoiceDate:["",[]]
    })

    this.loadAllSuppliers();
    this.loadAllTerm();
}

loadAllTerm() {
  this.allModulesService.get("/v1/invoice-details/get-term").subscribe((response: any) => {
    this.term = response?.data;
  }, (error) => {
    this.toastr.error(error.error.message);
  });
}

loadAllSuppliers() {
  this.allModulesService.get("/v1/supplier-details/all").subscribe((response: any) => {
    this.suppliers = response?.data;
  }, (error) => {
    this.toastr.error(error.error.message);
  });
}

onSearch(){
  this.searchFormData = this.searchForm.value;
  this.searchFormData.fromInvoiceDate = this.datePipe.transform(this.searchFormData.fromInvoiceDate, 'yyyy-MM-dd');
  this.searchFormData.toInvoiceDate = this.datePipe.transform(this.searchFormData.toInvoiceDate, 'yyyy-MM-dd');
  this.rerender();
}

searchByDate() {
  this.searchFormData = this.searchForm.value;
  this.searchFormData.fromInvoiceDate = this.datePipe.transform(this.searchFormData.fromInvoiceDate, 'yyyy-MM-dd');
  this.searchFormData.toInvoiceDate = this.datePipe.transform(this.searchFormData.toInvoiceDate, 'yyyy-MM-dd');
}

  //Function to handle table header click
  onTableHeaderClick(columnIndex: number, columnName: string) {
    // Update dynamic column properties
    this.orderColumnIndex = columnIndex;
    this.orderColumnName = columnName;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table
  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    setTimeout(() => {
      this.dtTrigger.next();
    }, 500);
  }

  //Reset form
  public resetForm() {
    this.addInvoiceForm.reset();
    this.invoice.netDue = null;
    // this.invoice.creditAmount = 0;
  }

  // Edit invoice
  public onInvoiceSupplier(invoiceId: any) {
    let invoice = this.invoicesData.filter((invoice) => invoice.id === invoiceId);
    this.editInvoiceForm.setValue({
      editInvoiceNumber: invoice[0]?.invoiceNumber,
      editInvoiceDesc: invoice[0]?.invoiceDesc,
      editInvoiceDate: invoice[0]?.invoiceDate,
      editTerm: invoice[0]?.term,
      editInvoiceAmount: invoice[0]?.invoiceAmount,
      editCreditAmount: invoice[0]?.creditAmount,
      editChequeNumber: invoice[0]?.chequeNumber,
      editIsPaid: invoice[0]?.isPaid,
      editPaidDate: invoice[0]?.paidDate,
      editSupplierDetails: invoice[0]?.supplierDetails,
      editId: invoice[0]?.id,

      editNetDue: invoice[0]?.netDue,
      editPaymentDueDate: invoice[0]?.paymentDueDate,
    });
    console.log(this.editInvoiceForm);
  }


  // Update Invoice
  public onEditInvoice() {
    if (this.invoice.isPaid && !this.editInvoiceForm.value.editPaidDate) {
      this.toastr.info("Please insert paid date");
      return;
    }
    this.invoice.isPaid = this.invoice.isPaid ? this.invoice.isPaid : false;

    if (this.editInvoiceForm.invalid) {
      this.toastr.info("Please insert valid data");
      return;
    }
    this.editedInvoice = {
      invoiceNumber: this.editInvoiceForm.value.editInvoiceNumber,
      invoiceDesc: this.editInvoiceForm.value.editInvoiceDesc,
      invoiceDate: this.editInvoiceForm.value.editInvoiceDate,
      term: this.editInvoiceForm.value.editTerm,
      invoiceAmount: this.editInvoiceForm.value.editInvoiceAmount,
      creditAmount: this.editInvoiceForm.value.editCreditAmount,
      chequeNumber: this.editInvoiceForm.value.editChequeNumber,
      paidDate: this.editInvoiceForm.value.editPaidDate,
      supplierDetails: this.editInvoiceForm.value.editSupplierDetails,
      id: this.editInvoiceForm.value.editId,

      isPaid: this.invoice.isPaid,
      netDue: this.invoice.netDue,
      paymentDueDate: this.invoice.paymentDueDate,

    };
    this.allModulesService
      .update(this.editedInvoice, "/v1/invoice-details/update")
      .subscribe((data) => {
        $("#edit_invoice").modal("hide");
        this.editInvoiceForm.reset();
        this.toastr.success("Invoice updated sucessfully!", "Success");

        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      },
      (error) => {
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.error(customErrorMessage, "Error",{ timeOut: 5000 });
        return;
      });
  }

  //Add new Invoice
  public onAddInvoice() {
    if (this.invoice.isPaid && !this.addInvoiceForm.value.paidDate) {
      this.toastr.info("Please insert paid date");
      return;
    }
    this.invoice.isPaid = this.invoice.isPaid ? this.invoice.isPaid : false;

    if (this.addInvoiceForm.invalid || (this.invoice.creditAmount > this.invoice.invoiceAmount)) {
      this.toastr.info("Please insert valid data");
      return;
    }
    let newSupplier = {
      invoiceNumber: this.addInvoiceForm.value.invoiceNumber,
      invoiceDesc: this.addInvoiceForm.value.invoiceDesc,
      invoiceDate: this.addInvoiceForm.value.invoiceDate,
      term: this.addInvoiceForm.value.term,
      invoiceAmount: this.addInvoiceForm.value.invoiceAmount,
      creditAmount: this.addInvoiceForm.value.creditAmount,
      chequeNumber: this.addInvoiceForm.value.chequeNumber,
      isPaid: this.addInvoiceForm.value.isPaid,
      paidDate: this.addInvoiceForm.value.paidDate,
      supplierDetails: this.addInvoiceForm.value.supplierDetails,

      netDue: this.invoice.netDue,
      paymentDueDate: this.invoice.paymentDueDate,
    };
    this.allModulesService.add(newSupplier, "/v1/invoice-details/save").subscribe((data) => {
    if(data.status == "error") {
        this.toastr.error(data.errors,"Failed");
        return;
      }
      $("#add_invoice").modal("hide");
      this.addInvoiceForm.reset();
      this.toastr.success("Invoice added sucessfully!", "Success");

      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    },
    (error) => {
      console.error("API Error:", error);
      // Extract error message from the API response
      const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
      this.toastr.error(customErrorMessage, "Error",{ timeOut: 5000 });
      return;
    });
  }

  netDueCalculation(event){
    if( this.invoice.invoiceAmount >= this.invoice.creditAmount){
      this.invoice.netDue = this.invoice.invoiceAmount - this.invoice.creditAmount;
      let val = (Math.round( this.invoice.netDue * 100) / 100).toFixed(2);
      this.invoice.netDue = +val;
      return;
    }
    this.invoice.netDue = null;
  }

  paymentDueDateCalculation(event){
    if(this.invoice?.term){
      const newDate = new Date(this.invoice.invoiceDate);
      const termAsNumber = parseInt(this.invoice.term, 10);
      newDate.setDate(newDate.getDate() + termAsNumber);
      this.invoice.paymentDueDate = newDate;
    }
  }

  //Delete Invoice
  onDelete() {
    let updateStatusDto = {
      status: RecordStatus.Deleted,
      id: this.tempId,
    };

    this.allModulesService.update(updateStatusDto, "/v1/invoice-details/update-status").subscribe((data) => {
      $("#delete_invoice").modal("hide");
      this.toastr.success("Invoice deleted sucessfully...!", "Success");

      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    },
      (error) => {
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.error(customErrorMessage, "Error",{ timeOut: 5000 });
        return;
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
