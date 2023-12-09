import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";

declare const $: any;
@Component({
  selector: "app-clients-list",
  templateUrl: "./clients-list.component.html",
  styleUrls: ["./clients-list.component.css"],
})
export class ClientsListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  public clientsData = [];
  public editedClient;
  public addClientForm: FormGroup;
  public editClientForm: FormGroup;
  public tempId: any;
  public companiesList = [];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
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
    this.addClientForm = this.formBuilder.group({
      clientName: ["", [Validators.required]],
      clientPhone: ["", [Validators.required]],
      clientEmail: ["", [Validators.required]],
      clientCompany: ["", [Validators.required]],
      clientRole: ["", [Validators.required]],
      clientId: ["", [Validators.required]],
    });

    //Edit Clients Form
    this.editClientForm = this.formBuilder.group({
      editClientName: ["", [Validators.required]],
      editClientPhone: ["", [Validators.required]],
      editClientEmail: ["", [Validators.required]],
      editClientCompany: ["", [Validators.required]],
      editClientRole: ["", [Validators.required]],
      editClientId: ["", [Validators.required]],
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
    this.editClientForm.setValue({
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
    this.addClientForm.reset();
  }

  // Save Client
  public onSave() {
    this.editedClient = {
      name: this.editClientForm.value.editClientName,
      role: "CEO",
      company: this.editClientForm.value.editClientCompany,
      clientId: this.editClientForm.value.editClientId,
      email: this.editClientForm.value.editClientEmail,
      phone: this.editClientForm.value.editClientPhone,
      status: "Active",
      id: this.editClientForm.value.editId,
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
    this.editClientForm.reset();
    this.toastr.success("Client updated sucessfully...!", "Success");
  }

  //Add new client
  public onAddClient() {
    let newClient = {
      name: this.addClientForm.value.clientName,
      role: "CEO",
      company: this.addClientForm.value.clientCompany,
      clientId: this.addClientForm.value.clientId,
      email: this.addClientForm.value.clientEmail,
      phone: this.addClientForm.value.clientPhone,
      status: "Active",
    };
    this.allModulesService.add(newClient, "clients").subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getClients();
    $("#add_client").modal("hide");
    this.addClientForm.reset();
    this.toastr.success("Client added sucessfully...!", "Success");
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
