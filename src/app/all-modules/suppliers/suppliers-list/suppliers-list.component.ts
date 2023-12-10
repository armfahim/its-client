import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { Suppliers } from '../../model/suppliers';
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
  public clientsData = [];
  public editedClient;
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


  constructor(
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.getClients();

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
    this.clientsData = [];
    this.getClients();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  //Get all Clients data
  public getClients() {
    this.allModulesService.get("clients").subscribe((data) => {
      this.clientsData = data;
      this.clientsData.map((client) => this.companiesList.push(client.company));
      this.rows = this.clientsData;
      this.srch = [...this.rows];
    });
  }

  // Edit client
  public onEditClient(clientId: any) {
    let client = this.clientsData.filter((client) => client.id === clientId);
    this.editSupplierForm.setValue({
      editClientName: client[0]?.name,
      editClientPhone: client[0]?.phone,
      editClientEmail: client[0]?.email,
      editClientCompany: client[0]?.company,
      editClientRole: client[0]?.role,
      editClientId: client[0]?.clientId,
      editId: client[0]?.id,
    });
  }

  //Reset form
  public resetForm() {
    this.addSupplierForm.reset();
  }

  // Update Client
  public onSave() {
    this.editedClient = {
      name: this.editSupplierForm.value.editClientName,
      role: "CEO",
      company: this.editSupplierForm.value.editClientCompany,
      clientId: this.editSupplierForm.value.editClientId,
      email: this.editSupplierForm.value.editClientEmail,
      phone: this.editSupplierForm.value.editClientPhone,
      status: "Active",
      id: this.editSupplierForm.value.editId,
    };
    this.allModulesService
      .update(this.editedClient, "clients")
      .subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
    this.getClients();
    $("#edit_client").modal("hide");
    this.editSupplierForm.reset();
    this.toastr.success("Client updated sucessfully...!", "Success");
  }

  //Add new client
  public onAddSupplier() {
    let newSupplier = {
      supplierID: this.addSupplierForm.value.supplierID,
      // role: "CEO",
      supplierName: this.addSupplierForm.value.supplierName,
      contactPerson: this.addSupplierForm.value.contactPerson,
      phone: this.addSupplierForm.value.phone,
      email: this.addSupplierForm.value.email,
      address: this.addSupplierForm.value.address
      // status: "Active",
    };
    this.allModulesService.add(newSupplier, "/its/api/v1/supplier-details/save").subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getClients();
    $("#add_client").modal("hide");
    this.addSupplierForm.reset();
    this.toastr.success("Supplier added sucessfully!", "Success");
  }

  //Delete Client
  onDelete() {
    this.allModulesService.delete(this.tempId, "clients").subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getClients();
    $("#delete_client").modal("hide");
    this.toastr.success("Client deleted sucessfully...!", "Success");
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
