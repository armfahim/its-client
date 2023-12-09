import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";

declare const $: any;
@Component({
  selector: "app-clients-content-page",
  templateUrl: "./clients-content-page.component.html",
  styleUrls: ["./clients-content-page.component.css"],
})
export class ClientsContentPageComponent implements OnInit, OnDestroy {
  public clientsData = [];
  public editedClient;
  public addClientForm: FormGroup;
  public editClientForm: FormGroup;
  public tempId: any;
  public searchName: any;
  public searchId: any;
  public searchCompany: any;
  public companiesList = [];
  public filtereddata = [];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
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

  //Get all Clients data
  public getClients() {
    this.allModulesService.get("clients").subscribe((data) => {
      this.clientsData = data;
      if (this.companiesList.length === 0) {
        this.clientsData.map((client) =>
          this.companiesList.push(client.company)
        );

        this.dtTrigger.next();
        this.rows = this.clientsData;
        this.srch = [...this.rows];
      }
    });
  }

  // Edit client
  public onEditClient(clientId: any) {
    let client = this.clientsData.filter((client) => client.id === clientId);
    this.editClientForm.setValue({
      editClientName: client[0].name,
      editClientPhone: client[0].phone,
      editClientEmail: client[0].email,
      editClientCompany: client[0].company,
      editClientRole: client[0].role,
      editClientId: client[0].clientId,
      editId: client[0].id,
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
      id: this.editClientForm.value.editId,
    };
    this.allModulesService.update(this.editedClient, "clients").subscribe();
    this.getClients();
    $("#edit_client").modal("hide");
    this.toastr.success("Client is updated", "Success");
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
      id: "",
    };
    this.allModulesService.add(newClient, "clients").subscribe();
    this.getClients();
    $("#add_client").modal("hide");
    this.toastr.success("Client is added", "Success");
  }

  //Delete Client
  onDelete() {
    this.allModulesService.delete(this.tempId, "clients").subscribe();
    this.getClients();
    $("#delete_client").modal("hide");
    this.toastr.success("Client is deleted", "Success");
  }

  // Search Client
  onSearch() {
    this.filtereddata = [];
    this.allModulesService.get("clients").subscribe((data) => {
      this.clientsData = data;
      if (this.searchId) {
        this.filtereddata = this.clientsData.filter((data) =>
          data.clientId.toLowerCase().includes(this.searchId.toLowerCase())
        );
        if (this.searchName) {
          let nameFilter = this.filtereddata.filter((data) =>
            data.name.toLowerCase().includes(this.searchName.toLowerCase())
          );
          if (nameFilter.length != 0) {
            this.filtereddata = nameFilter;
          }
        }
      }

      if (this.searchId || this.searchCompany || this.searchName) {
        this.clientsData =
          this.filtereddata.length != 0 ? this.filtereddata : this.clientsData;
      } else {
        this.clientsData = [];
      }
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
  searchByName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by company
  searchbyCompany(val) {
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
