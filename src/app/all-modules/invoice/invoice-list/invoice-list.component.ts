import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../model/invoice';

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
  public suppliersData: any;

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
  // Properties for dynamic column sorting
  orderColumnIndex: number = 0;
  orderColumnName: string = "";

  //Search Form
  searchForm: FormGroup;
  searchFormData : any;


  constructor(
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient
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
          dataTablesParameters.supplierName = this.searchFormData?.supplierName ? this.searchFormData.supplierName : "";
          this.allModulesService.getPaginatedData("/v1/supplier-details/list",dataTablesParameters).subscribe(resp => {
          this.suppliersData = resp?.data;
          this.rows = this.suppliersData;
          this.srch = [...this.rows];
              callback({
                recordsTotal: resp.meta.total,
                recordsFiltered: resp.meta.total,
                data: []  // set data
              });
            });
        },
    };

    // this.getClients();

    //Add clients form
    this.addInvoiceForm = this.formBuilder.group({
      invoiceNumber: ["", [Validators.required]],
      invoiceDesc: ["", [Validators.required]],
      invoiceDate: ["", [Validators.required]],
      term: ["", [Validators.required]],
      paymentDueDate: ["", [Validators.required]],
      invoiceAmount: ["", [Validators.required]],
      creditAmount: ["", [Validators.required]],
      netDue: ["", [Validators.required]],
      chequeNumber: ["", [Validators.required]],
      paidDate: ["", [Validators.required]],
      supplierDetails: ["", [Validators.required]],
    });

    //Edit Clients Form
    this.editInvoiceForm = this.formBuilder.group({
      editInvoiceNumber: ["", [Validators.required]],
      editInvoiceDesc: ["", [Validators.required]],
      editInvoiceDate: ["", [Validators.required]],
      editTerm: ["", [Validators.required]],
      editPaymentDueDate: ["", [Validators.required]],
      editInvoiceAmount: ["", [Validators.required]],
      editCreditAmount: ["", [Validators.required]],
      editNetDue: ["", [Validators.required]],
      editChequeNumber: ["", [Validators.required]],
      editPaidDate: ["", [Validators.required]],
      editSupplierDetails: ["", [Validators.required]],
    });

    // Search Form
    this.searchForm = this.formBuilder.group({
      supplierName:["",[]]
    })
}

onSearch(){
  this.searchFormData = this.searchForm.value;
  this.rerender();
}

  //Function to handle table header click
  onTableHeaderClick(columnIndex: number, columnName: string) {
    // Update dynamic column properties
    this.orderColumnIndex = columnIndex;
    this.orderColumnName = columnName;

    // Reload the DataTable with the new sorting parameters
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.ajax.reload();
    // });
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

    //Init search form data, if any
    this.searchFormData = this.searchForm?.value;
  }
  //Get all Clients data
  public getClients() {
    this.allModulesService.get("http://localhost:9000/its/api/v1/supplier-details/list").subscribe((response) => {
    this.suppliersData = response?.data;
      // this.clientsData.map((client) => this.companiesList.push(client.company));
      this.rows = this.suppliersData;
      this.srch = [...this.rows];
    });
  }

  // Edit Supplier
  // public onEditSupplier(supplierId: any) {
  //   let supplier = this.suppliersData.filter((client) => client.id === supplierId);
  //   this.editInvoiceForm.setValue({
  //     editSupplierName: supplier[0]?.supplierName,
  //     editPhone: supplier[0]?.phone,
  //     editEmail: supplier[0]?.email,
  //     editContactPerson: supplier[0]?.contactPerson,
  //     editAddress: supplier[0]?.address,
  //     editId: supplier[0]?.id,
  //   });
  // }

  //Reset form
  public resetForm() {
    this.addInvoiceForm.reset();
  }

  // Update Supplier
  // public onSave() {
  //   if (this.editSupplierForm.invalid) {
  //     this.toastr.info("Please insert valid data");
  //     return;
  //   }
  //   this.editedSupplier = {
  //     supplierName: this.editSupplierForm.value.editSupplierName,
  //     email: this.editSupplierForm.value.editEmail,
  //     phone: this.editSupplierForm.value.editPhone,
  //     contactPerson: this.editSupplierForm.value.editContactPerson,
  //     address: this.editSupplierForm.value.editAddress,
  //     id: this.editSupplierForm.value.editId,
  //   };
  //   this.allModulesService
  //     .update(this.editedSupplier, "/v1/supplier-details/update")
  //     .subscribe((data) => {
  //       $("#edit_supplier").modal("hide");
  //       this.editSupplierForm.reset();
  //       this.toastr.success("Supplier updated sucessfully!", "Success");

  //       $("#datatable").DataTable().clear();
  //       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //         dtInstance.destroy();
  //       });
  //       this.dtTrigger.next();
  //     },
  //     (error) => {
  //       console.error("API Error:", error);
  //       // Extract error message from the API response
  //       const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
  //       this.toastr.error(customErrorMessage, "Error",{ timeOut: 5000 });
  //       return;
  //     });
  // }

  //Add new client
  public onAddSupplier() {
    if (this.addInvoiceForm.invalid) {
      this.toastr.info("Please insert valid data");
      return;
    }
    let newSupplier = {
      supplierName: this.addInvoiceForm.value.supplierName,
      contactPerson: this.addInvoiceForm.value.contactPerson,
      phone: this.addInvoiceForm.value.phone,
      email: this.addInvoiceForm.value.email,
      address: this.addInvoiceForm.value.address
    };
    this.allModulesService.add(newSupplier, "/v1/supplier-details/save").subscribe((data) => {
    if(data.status == "error") {
        this.toastr.error(data.errors,"Failed");
        return;
      }
      $("#add_supplier").modal("hide");
      this.addInvoiceForm.reset();
      this.toastr.success("Supplier added sucessfully!", "Success");

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
    // this.getClients();
  }

  //Delete Client
  // onDelete() {
  //   // let updateStatusDto = {
  //   //   status: RecordStatus.Deleted,
  //   //   id: this.editSupplierForm.value.editId,
  //   // };

  //   this.allModulesService.delete(this.tempId, "/v1/supplier-details/delete").subscribe((data) => {
  //     $("#delete_supplier").modal("hide");
  //     this.toastr.success("Supplier deleted sucessfully...!", "Success");

  //     $("#datatable").DataTable().clear();
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy();
  //     });
  //     this.dtTrigger.next();
  //   },
  //     (error) => {
  //       console.error("API Error:", error);
  //       // Extract error message from the API response
  //       const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
  //       this.toastr.error(customErrorMessage, "Error",{ timeOut: 5000 });
  //       return;
  //     });
  // }

  //search by name
  // searchID(val) {
  //   this.rows.splice(0, this.rows.length);
  //   let temp = this.srch.filter(function (d) {
  //     val = val.toLowerCase();
  //     return d.supplierID.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   this.rows.push(...temp);
  // }

  //search by name
  // searchName(val) {
  //   this.rows.splice(0, this.rows.length);
  //   let temp = this.srch.filter(function (d) {
  //     val = val.toLowerCase();
  //     return d.supplierName.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   this.rows.push(...temp);
  // }

  //search by company
  // searchCompany(val) {
  //   this.rows.splice(0, this.rows.length);
  //   let temp = this.srch.filter(function (d) {
  //     val = val.toLowerCase();
  //     return d.company.toLowerCase().indexOf(val) !== -1 || !val;
  //   });
  //   this.rows.push(...temp);
  // }
  //getting the status value
  // getStatus(data) {
  //   this.statusValue = data;
  // }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
