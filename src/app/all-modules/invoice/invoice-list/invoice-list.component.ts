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
  codTerm:any;

  // Properties for dynamic column sorting
  orderColumnIndex: number = 0;
  orderColumnName: string = "";

  //Search Form
  searchForm: FormGroup;
  searchFormData : any;
  searchSupplierId: any;
  fromInvoiceDate:any;
  toInvoiceDate:any;
  isGreaterThan: boolean = false;
  invoiceAmount: any;
  creditAmount: any ;
  loading = false;
  codInCheque = false;

  // Display value with a dollar sign
  formattedInvoiceAmount: string = '$';
  formattedCreditAmount: string = '$';
  formattedNeDue: string = '$';


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

          // If it's the default order, override it with your desired order
          if (!this.orderColumnName) {
              dataTablesParameters.order = [{ column: 2, dir: 'desc' }];
          }

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
      paymentDueDate: ["", []],
      invoiceAmount: ["", [Validators.required]],
      creditAmount: ["", [Validators.required]],
      netDue: ["", [Validators.required]],
      chequeNumber: ["", []],
      isPaid: ["", []],
      paidDate: ["", []],
      codIncheque:["",[]],
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
      editChequeNumber: ["", []],
      editIsPaid: ["", []],
      editPaidDate: ["", []],
      editCodIncheque:["", []],
      editSupplierDetails: ["", [Validators.required]],
      editId: ["", []],
    });

    this.editInvoiceForm.get("editPaymentDueDate").disable();
    this.editInvoiceForm.get("editNetDue").disable();

    // Search Form
    this.searchForm = this.formBuilder.group({
      supplierId:["",[]],
      fromInvoiceDate:["",[]],
      toInvoiceDate:["",[]]
    })

    this.loadAllSuppliers();
    this.loadAllTerm();
}

  // On Set Edit invoice
  public onInvoice(invoiceId: any) {
    let invoice = this.invoicesData.filter((invoice) => invoice.id === invoiceId);
    this.editInvoiceForm.setValue({
      editInvoiceNumber: invoice[0]?.invoiceNumber,
      editInvoiceDesc: invoice[0]?.invoiceDesc,
      editInvoiceDate: invoice[0]?.invoiceDate,
      editTerm: invoice[0]?.term,
      editInvoiceAmount: invoice[0]?.invoiceAmount.replace(/,/g,''),
      editCreditAmount: invoice[0]?.creditAmount.replace(/,/g,''),
      editChequeNumber: invoice[0]?.chequeNumber,
      editIsPaid: invoice[0]?.isPaid,
      editPaidDate: invoice[0]?.paidDate,
      editSupplierDetails: invoice[0]?.supplierDetails,
      editId: invoice[0]?.id,
      editNetDue: invoice[0]?.netDue.replace(/,/g,''),
      editPaymentDueDate: invoice[0]?.paymentDueDate,
      editCodIncheque: invoice[0]?.chequeNumber ? true : false,
    });
    this.formattedInvoiceAmount = '$' + invoice[0]?.invoiceAmount;
    this.formattedCreditAmount = '$' + invoice[0]?.creditAmount;
    this.formattedNeDue = '$' + invoice[0]?.netDue;
    this.invoice.invoiceAmount = invoice[0]?.invoiceAmount.replace(/,/g,''); // replaced $ sign from the value
    this.invoice.creditAmount = invoice[0]?.creditAmount.replace(/,/g,'');
    this.invoice.netDue = invoice[0]?.netDue.replace(/,/g,'');
    if(this.invoice.term == this.codTerm && invoice[0]?.chequeNumber != null && invoice[0]?.chequeNumber != undefined) {
      this.codInCheque = true;
    }
    console.log(this.editInvoiceForm);
  }


  // Update Invoice - api calling
  public onEditInvoice() {
    this.loading = true;
    if(!this.customValidationForUpdate()) return;

    this.invoice.isPaid = this.invoice.isPaid ? this.invoice.isPaid : false;
   // if(this.invoice.term == this.codTerm && this.editInvoiceForm.value.editChequeNumber != null && this.editInvoiceForm.value.editChequeNumber != undefined)
    this.editedInvoice = {
      invoiceNumber: this.editInvoiceForm.value.editInvoiceNumber,
      invoiceDesc: this.editInvoiceForm.value.editInvoiceDesc,
      invoiceDate: this.editInvoiceForm.value.editInvoiceDate,
      term: this.editInvoiceForm.value.editTerm,
      // invoiceAmount: this.editInvoiceForm.value.editInvoiceAmount,
      // creditAmount: this.editInvoiceForm.value.editCreditAmount,
      chequeNumber: this.editInvoiceForm.value.editChequeNumber,
      paidDate: this.editInvoiceForm.value.editPaidDate,
      supplierDetails: this.editInvoiceForm.value.editSupplierDetails,
      id: this.editInvoiceForm.value.editId,

      invoiceAmount:this.invoice.invoiceAmount,
      creditAmount: this.invoice.creditAmount,
      netDue: this.invoice.netDue,

      isPaid: this.invoice.isPaid,
      paymentDueDate: this.invoice.paymentDueDate,

    };
    var datePipe = new DatePipe('en-US');
    this.editedInvoice.invoiceDate = datePipe.transform( this.editedInvoice.invoiceDate, 'MM-dd-yyyy');
    this.editedInvoice.paymentDueDate = datePipe.transform( this.editedInvoice.paymentDueDate, 'MM-dd-yyyy');
    this.editedInvoice.paidDate = datePipe.transform( this.editedInvoice.paidDate, 'MM-dd-yyyy');

    this.allModulesService
      .update(this.editedInvoice, "/v1/invoice-details/update")
      .subscribe((data) => {
        this.loading = false;
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
        this.loading = false;
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.info(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

  //Add new Invoice
  public onAddInvoice() {
    this.loading = true;
    if(!this.customValidationForAdd()) return;

    this.invoice.isPaid = this.invoice.isPaid ? this.invoice.isPaid : false;
    let newSupplier = {
      invoiceNumber: this.addInvoiceForm.value.invoiceNumber,
      invoiceDesc: this.addInvoiceForm.value.invoiceDesc,
      invoiceDate: this.addInvoiceForm.value.invoiceDate,
      term: this.addInvoiceForm.value.term,
      // invoiceAmount: this.addInvoiceForm.value.invoiceAmount,
      // creditAmount: this.addInvoiceForm.value.creditAmount,
      chequeNumber: this.addInvoiceForm.value.chequeNumber,
      isPaid: this.addInvoiceForm.value.isPaid,
      paidDate: this.addInvoiceForm.value.paidDate,
      supplierDetails: this.addInvoiceForm.value.supplierDetails,

      invoiceAmount:this.invoice.invoiceAmount,
      creditAmount: this.invoice.creditAmount,
      netDue: this.invoice.netDue,
      paymentDueDate: this.invoice.paymentDueDate,
    };

    var datePipe = new DatePipe('en-US');
    newSupplier.invoiceDate = datePipe.transform( newSupplier.invoiceDate, 'MM-dd-yyyy');
    newSupplier.paymentDueDate = datePipe.transform( newSupplier.paymentDueDate, 'MM-dd-yyyy');
    newSupplier.paidDate = datePipe.transform( newSupplier.paidDate, 'MM-dd-yyyy');

    this.allModulesService.add(newSupplier, "/v1/invoice-details/save").subscribe((data) => {
      if(data.status == "error") {
          this.toastr.error(data.errors,"Failed");
          return;
        }
        this.loading = false;
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
        this.loading = false;
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.info(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

  /**
   * validate form field with custom logics
   */
  customValidationForAdd(): boolean{
    if(!this.addInvoiceForm.value.invoiceAmount){
      this.toastr.info("Please insert invoice amount");
      this.addInvoiceForm.get('invoiceAmount').markAsTouched();
      this.addInvoiceForm.get('invoiceAmount').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if(!this.addInvoiceForm.value.creditAmount){
      this.toastr.info("Please insert credit amount");
      this.addInvoiceForm.get('creditAmount').markAsTouched();
      this.addInvoiceForm.get('creditAmount').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if (this.addInvoiceForm.invalid) {
      this.toastr.info("Please insert valid data");
      this.loading = false;
      return false;
    }
    // if (this.invoice.isPaid && !this.addInvoiceForm.value.paidDate) {
    //   this.toastr.info("Please insert paid date");
    //   this.addInvoiceForm.get('paidDate').markAsTouched();
    //   this.addInvoiceForm.get('paidDate').setErrors({ 'invalid': true });
    //   this.loading = false;
    //   return false;
    // }
    // if(this.codInCheque && !this.addInvoiceForm.value.chequeNumber){
    //   this.toastr.info("Please provide cheque number");
    //   this.addInvoiceForm.get('chequeNumber').markAsTouched();
    //   this.addInvoiceForm.get('chequeNumber').setErrors({ 'invalid': true });
    //   this.loading = false;
    //   return false;
    // }
    if (this.invoice.term != this.codTerm && !this.invoice.paymentDueDate) {
      this.toastr.error("Failed to calculate payment due data","Error");
      this.addInvoiceForm.get('paymentDueDate').markAsTouched();
      this.addInvoiceForm.get('paymentDueDate').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if(this.creditAmount > this.invoiceAmount) {
      this.toastr.error("Credit amount is greater than invoice amount","Net due is required");
      this.addInvoiceForm.get('netDue').markAsTouched();
      this.addInvoiceForm.get('netDue').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    return true;
  }

  customValidationForUpdate(): boolean{
    if(!this.editInvoiceForm.value.editInvoiceAmount){
      this.toastr.info("Please insert invoice amount");
      this.editInvoiceForm.get('editInvoiceAmount').markAsTouched();
      this.editInvoiceForm.get('editInvoiceAmount').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if(!this.editInvoiceForm.value.editCreditAmount){
      this.toastr.info("Please insert credit amount");
      this.editInvoiceForm.get('editCreditAmount').markAsTouched();
      this.editInvoiceForm.get('editCreditAmount').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if (this.editInvoiceForm.invalid) {
      this.toastr.info("Please insert valid data");
      this.loading = false;
      return false;
    }
    // if (this.invoice.isPaid && !this.editInvoiceForm.value.editPaidDate) {
    //   this.toastr.info("Please insert paid date");
    //   this.editInvoiceForm.get('editPaidDate').markAsTouched();
    //   this.editInvoiceForm.get('editPaidDate').setErrors({ 'invalid': true });
    //   this.loading = false;
    //   return false;
    // }
    // if(this.codInCheque && !this.editInvoiceForm.value.editChequeNumber){
    //   this.toastr.info("Please provide cheque number");
    //   this.editInvoiceForm.get('editChequeNumber').markAsTouched();
    //   this.editInvoiceForm.get('editChequeNumber').setErrors({ 'invalid': true });
    //   this.loading = false;
    //   return false;
    // }
    if (this.invoice.term != this.codTerm && !this.invoice.paymentDueDate) {
      this.toastr.error("Failed to calculate payment due data","Error");
      this.editInvoiceForm.get('editPaymentDueDate').markAsTouched();
      this.editInvoiceForm.get('editPaymentDueDate').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if(this.creditAmount > this.invoiceAmount) {
      this.toastr.error("Credit amount is greater than invoice amount","Net due is required");
      this.editInvoiceForm.get('netDue').markAsTouched();
      this.editInvoiceForm.get('netDue').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    return true;
  }

  /** set chequeNumber in addInvoiceForm according to set of checkbox of COD in Cheque */
  setChequeNumberOnAdd(){
    if(this.codInCheque != true ){
      this.addInvoiceForm.get('chequeNumber').patchValue('');
    }
  }
  setChequeNumberOnEdit(){
    if(this.codInCheque != true ){
      this.editInvoiceForm.get('editChequeNumber').patchValue('');
    }
  }

  /**
   * Fomat number fields to add prefix '$' in the input fields and calculate net due
   */

  // Method to format the input as currency
  formatInvoiceAmountCurrency() {
    // Remove non-numeric characters from the input
    const numericValue = parseFloat(this.formattedInvoiceAmount.replace(/[^0-9.]/g, ''));
    this.invoice.invoiceAmount = isNaN(numericValue) ? null : numericValue;

    // Format the numeric value as currency with a dollar sign
    this.formattedInvoiceAmount = isNaN(numericValue) ? '$' : '$' + this.invoice.invoiceAmount;
    this.netDueCalculation(null);
  }

  formatCreditAmountCurrency() {
    const numericValue = parseFloat(this.formattedCreditAmount.replace(/[^0-9.]/g, ''));
    this.invoice.creditAmount = isNaN(numericValue) ? null : numericValue;
    this.formattedCreditAmount = isNaN(numericValue) ? '$' : '$' + this.invoice.creditAmount;

    this.netDueCalculation(null);
  }

  formatNetDueCurrency() {
    const numericValue = parseFloat(this.formattedNeDue.replace(/[^0-9.]/g, ''));
    this.invoice.netDue = isNaN(numericValue) ? null : numericValue;
    this.formattedNeDue = isNaN(numericValue) ? '$' : '$' + this.invoice.netDue;
  }
  /** End of formatting fields with '$' */


  netDueCalculation(event){
     this.invoiceAmount = Number(this.invoice.invoiceAmount);
     this.creditAmount = Number(this.invoice.creditAmount);

    if (!isNaN(this.invoiceAmount) && !isNaN(this.creditAmount)) {
      if (this.invoiceAmount >= this.creditAmount) {
      this.invoice.netDue = this.invoice.invoiceAmount - this.invoice.creditAmount;
      let val = (Math.round( this.invoice.netDue * 100) / 100).toFixed(2);
      this.invoice.netDue = +val;
      this.formattedNeDue = '$' + this.invoice.netDue;
      return;
      }
    }
    this.invoice.netDue = null;
    this.formattedNeDue = this.invoice.netDue ? '$' + this.invoice.netDue : '$';
    this.isGreaterThan = true;
  }

  paymentDueDateCalculation(event){
    if(this.invoice?.term != undefined && this.invoice?.term == this.codTerm) {
      this.invoice.paymentDueDate = null;
      this.invoice.isPaid = true;
      return;
    }
    if(this.invoice?.term && this.invoice?.invoiceDate){
      const newDate = new Date(this.invoice.invoiceDate);
      const termAsNumber = parseInt(this.invoice.term, 10);
      newDate.setDate(newDate.getDate() + termAsNumber);
      let formatDate = this.datePipe.transform(newDate, 'MM-dd-yyyy');
      this.invoice.paymentDueDate = formatDate.toLocaleString();
    }
    if(this.invoice.term != this.codTerm){
      this.codInCheque = false;
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

  loadAllTerm() {
    this.allModulesService.get("/v1/invoice-details/get-term").subscribe((response: any) => {
      this.term = response?.data;
      this.codTerm = this.term.filter((data: { key: string; value: string }) => data.key === 'COD');
      this.codTerm = this.codTerm[0].value;
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
    this.formattedNeDue = null;
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
