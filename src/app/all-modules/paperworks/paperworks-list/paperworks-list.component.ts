import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare const $: any;
@Component({
  selector: 'app-paperworks-list',
  templateUrl: './paperworks-list.component.html',
  styleUrls: ['./paperworks-list.component.css']
})
export class PaperworksListComponent implements OnInit {

  public newPaperworkFileForm: FormGroup;
  months = ["January", "February", "March", "April", "May", "June"
            , "July", "August", "September", "October", "November", "December"];
  selectedYear: string;
  years:any;
  selectedMonth: string;
  loading = false;

  constructor(private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,) {}

  ngOnInit(): void {

    //Add new Paperwork File form
    this.newPaperworkFileForm = this.formBuilder.group({
      year: ["", [Validators.required]],
      month: ["", [Validators.required]],
    });

    this.getYearsList();
    this.selectedYear = null; // default selection
    this.selectedMonth = null; // default selection
  }

  onNewPaperworkFile(){
    this.loading = true;

    let newPaperWorkFile = {
      year: this.selectedYear,
      month: this.selectedMonth,
    };

    this.allModulesService.add(newPaperWorkFile, "/v1/paperwork/save").subscribe((data) => {
      if(data.status == "error") {
          this.toastr.error(data.errors,"Failed");
          return;
        }
        this.loading = false;
        $("#add_paperwork").modal("hide");
        this.newPaperworkFileForm.reset();
        this.toastr.success("New paperwork file has been opened sucessfully!", "Success");

        // $("#datatable").DataTable().clear();
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //   dtInstance.destroy();
        // });
        // this.dtTrigger.next();
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

  getYearsList() {
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    console.log(range(currentYear, currentYear - 50, -1)); 
    this.years = range(currentYear, currentYear - 50, -1);
  }

}
