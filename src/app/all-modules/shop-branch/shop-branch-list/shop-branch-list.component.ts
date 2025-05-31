import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RecordStatus } from 'src/app/utils/enums.enum';

declare const $: any;
@Component({
  selector: 'app-shop-branch-list',
  templateUrl: './shop-branch-list.component.html',
  styleUrls: ['./shop-branch-list.component.css']
})
export class ShopBranchListComponent implements OnInit {

    @ViewChild(DataTableDirective, { static: false })
    public dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    public branchesData: any;
  
    public editedBranch;
    public addBranchForm: FormGroup;
    public editBranchForm: FormGroup;
    public tempId: any;
    public companiesList = [];
  
    public rows = [];
    public srch = [];
    public statusValue;
    public dtTrigger: Subject<any> = new Subject();
    public pipe = new DatePipe("en-US");
  
    //Model
    // suppliers: Suppliers = new Suppliers();
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
    private http: HttpClient,
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
          dataTablesParameters.branchName = this.searchFormData?.branchName ? this.searchFormData.branchName : "";
          this.allModulesService.getBranchesPaginatedData("/v1/shop/branch/list",dataTablesParameters).subscribe(resp => {
          this.branchesData = resp?.data;
          this.rows = this.branchesData;
          this.srch = [...this.rows];
              callback({
                recordsTotal: resp.meta.total,
                recordsFiltered: resp.meta.total,
                data: []  // set data
              });
            });
        },
    };

    //Add form
    this.addBranchForm = this.formBuilder.group({
      branchName: ["", [Validators.required]],
      city: ["", []],
      address: ["", []],
    });

    //Edit Form
    this.editBranchForm = this.formBuilder.group({
      editBranchName: ["", [Validators.required]],
      editCity: ["", []],
      editAddress: ["", []],
      editId: ["", []],
    });

    // Search Form
    this.searchForm = this.formBuilder.group({
      branchName:["",[]]
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


  // Edit Branch
  public onEditBranch(branchId: any) {
    let branch = this.branchesData.filter((client) => client.id === branchId);
    this.editBranchForm.setValue({
      editBranchName: branch[0]?.branchName,
      editCity: branch[0]?.city,
      editAddress: branch[0]?.address,
      editId: branch[0]?.id,
    });
  }

  //Reset form
  public resetForm() {
    this.addBranchForm.reset();
  }

  // Update Branch
  public onSave() {
    if (this.editBranchForm.invalid) {
      this.toastr.info("Please insert Branch name");
      return;
    }
    this.editedBranch = {
      branchName: this.editBranchForm.value.editBranchName,
      city: this.editBranchForm.value.editCity,
      address: this.editBranchForm.value.editAddress,
      id: this.editBranchForm.value.editId,
    };
    this.allModulesService
      .update(this.editedBranch, "/v1/shop/branch/update")
      .subscribe((data) => {
        $("#edit_branch").modal("hide");
        this.editBranchForm.reset();
        this.toastr.success("Branch updated sucessfully!", "Success");

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
        this.toastr.info(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

  //Add new client
  public onAddBranch() {
    if (this.addBranchForm.invalid) {
      this.toastr.info("Please insert branch name");
      return;
    }
    let newBranch = {
      branchName: this.addBranchForm.value.branchName,
      city: this.addBranchForm.value.city,
      address: this.addBranchForm.value.address
    };
    this.allModulesService.add(newBranch, "/v1/shop/branch/save").subscribe((data) => {
    if(data.status == "error") {
        this.toastr.error(data.errors,"Failed");
        return;
      }
      $("#add_branch").modal("hide");
      this.addBranchForm.reset();
      this.toastr.success("Branch added sucessfully!", "Success");

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
      this.toastr.info(customErrorMessage, "Failed",{ timeOut: 5000 });
      return;
    });
    // this.getClients();
  }

  //Delete Client
  onDelete() {
    let updateStatusDto = {
      status: RecordStatus.Deleted,
      id: this.tempId,
    };

    this.allModulesService.delete(this.tempId, "/v1/shop/branch/delete").subscribe((data) => {
      $("#delete_branch").modal("hide");
      this.toastr.success("Branch deleted sucessfully...!", "Success");

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
      return d.branchID.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.branchName.toLowerCase().indexOf(val) !== -1 || !val;
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
