import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { PaperworksService } from '../../services/paperworks.service';
import { Router } from '@angular/router';
import { RecordStatus } from 'src/app/utils/enums.enum';


declare const $: any;
@Component({
  selector: 'app-paperworks-list',
  templateUrl: './paperworks-list.component.html',
  styleUrls: ['./paperworks-list.component.css']
})
export class PaperworksListComponent implements OnInit,OnDestroy {
  
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  
  public newPaperworkFileForm: FormGroup;
  selectedYear: string;
  years:any;
  selectedMonth: string;
  loading = false;
  public paperworksData: any;
  public tempId: any;

  //Search Form
  public searchForm: FormGroup;
  searchSelectedMonth:any;
  searchSelectedYear:any;
  searchFormData : any;
  
  format:any;

  // Properties for dynamic column sorting
  orderColumnIndex: number = 0;
  orderColumnName: string = "";

  //Months List
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  constructor(private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private paperworksService: PaperworksService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    var that = this;

    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
      ordering: true,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Ensure this context is correct
        dataTablesParameters.orderColumnName = this.orderColumnName;

        if (!this.orderColumnName) {
          dataTablesParameters.order = [{ column: 1, dir: 'desc' }];
      }
    
        dataTablesParameters.year = this.searchSelectedYear ? this.searchSelectedYear : "";
        dataTablesParameters.month = this.searchSelectedMonth ? this.searchSelectedMonth : "";
        dataTablesParameters.paperworkTitle = this.searchForm.get('searchPaperworkTitle').value ? this.searchForm.get('searchPaperworkTitle').value : "";
    
        this.paperworksService.getPaginatedData("/v1/paperwork/list", dataTablesParameters).subscribe(
          (resp) => {
            this.paperworksData = resp?.data;
            this.rows = this.paperworksData;
            this.srch = [...this.rows];
            callback({
              recordsTotal: resp.meta.total,
              recordsFiltered: resp.meta.total,
              data: []  // set data
            });
          },
          (error) => {
            console.error("API Error:", error);
            const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString() : "Unknown error";
            this.toastr.error(customErrorMessage, "Error", { timeOut: 5000 });
            return;
          }
        );
      },
    };

    //Add new Paperwork File form
    this.newPaperworkFileForm = this.formBuilder.group({
      month: ["", []],
      year: ["", []],
    });

    //Search form
    this.searchForm = this.formBuilder.group({
      paperworkTitle:["",[]],
      searchMonth:["",[Validators.required]],
      searchYear:["",[Validators.required]],
      searchPaperworkTitle:["",[]]
    })

    this.getYearsList();
    this.selectedYear = null; // default selection
    this.selectedMonth = null; // default selection
    this.searchSelectedMonth = null;
    this.searchSelectedYear = null;
  }

  setSharedPaperworkObj(obj: any) {
    this.paperworksService.changePaperworkObj(obj);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  onNewPaperworkFile(){
    if(this.selectedMonth == null) {
      this.toastr.warning("Please Select a Month", "Warning");
      return;
    }
    if(this.selectedYear == null) {
      this.toastr.warning("Please Select a Year", "Warning");
      return;
    }
    this.loading = true;

    let newPaperWorkFile = {
      year: this.selectedYear,
      month: this.selectedMonth,
    };

    this.allModulesService.add(newPaperWorkFile, "/v1/paperwork/save").subscribe((res) => {
      if(res.status == "error") {
          this.toastr.error(res.errors,"Failed");
          return;
        }
        this.loading = false;
        $("#add_paperwork").modal("hide");
        this.newPaperworkFileForm.reset();
        this.toastr.success("New paperwork file has been opened sucessfully!", "Success",{ timeOut: 5000 });

        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
        this.router.navigate(['/paperworks/add-paperwork/',res.data.id]);
      },
      (error) => {
        this.loading = false;
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.error(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

  public onPrint(value:any) {
    if(value == 1){
      this.format = 'PDF';
    }else if(value == 2){
      this.format = 'XLSX';
    }

    if (!this.tempId) {
      this.toastr.info('Please select an item');
      return;
    }
    // this.format = 'XLSX';
    const reqObj: any = {
      id: this.tempId ? this.tempId : null,
      reportFormat: this.format
    };

    this.paperworksService.report(reqObj).subscribe(
      (res: any) => {
        const file = new Blob([res], { type: this.printFormat(this.format) });
        const fileURL = URL.createObjectURL(file);
        
        if (this.format == 'PDF') {
          window.open(fileURL, "", "width=1100,height=950, left=500");
        } else {
          window.open(fileURL);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
    $("#paperwork_report").modal("hide");
    this.tempId = null;
  }

  getYearsList() {
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    this.years = range(currentYear, currentYear - 50, -1);
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
  }
  
  //Reset form
  public resetForm() {
    this.newPaperworkFileForm.reset();
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

   //Delete Client
   onDelete() {
    let updateStatusDto = {
      status: RecordStatus.Deleted,
      id: this.tempId,
    };

    this.allModulesService.delete(this.tempId, "/v1/paperwork/delete").subscribe((data) => {
      $("#delete_paperwork").modal("hide");
      this.toastr.success("Deleted sucessfully...!", "Success");

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
      this.tempId = null;
  }

  
	printFormat(formatKey: string) {
		let reportFormatMap = new Map();
		reportFormatMap.set('JPG', 'image/jpg');
		reportFormatMap.set('PNG', 'image/png');
		reportFormatMap.set('JPEG', 'image/jpeg');
		reportFormatMap.set('PDF', 'application/pdf');
		reportFormatMap.set('XLSX', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		reportFormatMap.set('DOCX', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		return reportFormatMap.get(formatKey.toUpperCase());
	}


}
