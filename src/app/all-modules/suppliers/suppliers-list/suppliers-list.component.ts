import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { Suppliers } from '../../model/suppliers';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from 'src/app/utils/paginated-response';
import { RecordStatus } from 'src/app/utils/enums.enum';

declare const $: any;
@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public suppliersData: any;

  public editedSupplier;
  public addSupplierForm: FormGroup;
  public editSupplierForm: FormGroup;
  public tempId: any;
  public companiesList = [];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  //Model
  suppliers: Suppliers = new Suppliers();
  // Properties for dynamic column sorting
  orderColumnIndex: number = 0;
  orderColumnName: string = "supplierName";


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
          this.allModulesService.getPaginated("/v1/supplier-details/list",dataTablesParameters).subscribe(resp => {
          this.suppliersData = resp?.data;
          console.log(resp);
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
    this.addSupplierForm = this.formBuilder.group({
      supplierID: ["", [Validators.required]],
      supplierName: ["", [Validators.required]],
      contactPerson: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });

    //Edit Clients Form
    this.editSupplierForm = this.formBuilder.group({
      editSupplierID: ["", [Validators.required]],
      editSupplierName: ["", [Validators.required]],
      editContactPerson: ["", [Validators.required]],
      editPhone: ["", [Validators.required]],
      editEmail: ["", [Validators.required]],
      editAddress: ["", [Validators.required]],
      editId: ["", [Validators.required]],
    });
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
    // this.suppliersData = [];
    // this.getClients();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  //Get all Clients data
  public getClients() {
    this.allModulesService.get("http://localhost:9000/its/api/v1/supplier-details/list").subscribe((response) => {
    this.suppliersData = response?.data;
      console.log(this.suppliersData);
      // this.clientsData.map((client) => this.companiesList.push(client.company));
      this.rows = this.suppliersData;
      this.srch = [...this.rows];
    });
  }

  // Edit Supplier
  public onEditSupplier(supplierId: any) {
    let supplier = this.suppliersData.filter((client) => client.id === supplierId);
    this.editSupplierForm.setValue({
      editSupplierName: supplier[0]?.supplierName,
      editPhone: supplier[0]?.phone,
      editEmail: supplier[0]?.email,
      editSupplierID: supplier[0]?.supplierID,
      editContactPerson: supplier[0]?.contactPerson,
      editAddress: supplier[0]?.address,
      editId: supplier[0]?.id,
    });
  }

  //Reset form
  public resetForm() {
    this.addSupplierForm.reset();
  }

  // Update Supplier
  public onSave() {
    if (this.editSupplierForm.invalid) {
      this.toastr.info("Please insert valid data");
      return;
    }
    this.editedSupplier = {
      supplierName: this.editSupplierForm.value.editSupplierName,
      supplierID: this.editSupplierForm.value.editSupplierID,
      email: this.editSupplierForm.value.editEmail,
      phone: this.editSupplierForm.value.editPhone,
      contactPerson: this.editSupplierForm.value.editContactPerson,
      address: this.editSupplierForm.value.editAddress,
      // status: "Active",
      id: this.editSupplierForm.value.editId,
    };
    this.allModulesService
      .update(this.editedSupplier, "/v1/supplier-details/update")
      .subscribe((data) => {
        $("#edit_supplier").modal("hide");
        this.editSupplierForm.reset();
        this.toastr.success("Supplier updated sucessfully!", "Success");
        
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

  //Add new client
  public onAddSupplier() {
    if (this.addSupplierForm.invalid) {
      this.toastr.info("Please insert valid data");
      return;
    }
    let newSupplier = {
      supplierID: this.addSupplierForm.value.supplierID,
      supplierName: this.addSupplierForm.value.supplierName,
      contactPerson: this.addSupplierForm.value.contactPerson,
      phone: this.addSupplierForm.value.phone,
      email: this.addSupplierForm.value.email,
      address: this.addSupplierForm.value.address
      // status: "Active",
    };
    this.allModulesService.add(newSupplier, "http://localhost:9000/its/api/v1/supplier-details/save").subscribe((data) => {
    if(data.status == "error") {
        this.toastr.error(data.errors,"Failed");
        return;
      }
      $("#add_supplier").modal("hide");
      this.addSupplierForm.reset();
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
  onDelete() {
    // let updateStatusDto = {
    //   status: RecordStatus.Deleted,
    //   id: this.editSupplierForm.value.editId,
    // };

    this.allModulesService.delete(this.tempId, "/v1/supplier-details/delete").subscribe((data) => {
      $("#delete_supplier").modal("hide");
      this.toastr.success("Supplier deleted sucessfully...!", "Success");

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

  //search by name
  searchID(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.clientId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by company
  searchCompany(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.company.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
