import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare const $: any;
@Component({
  selector: 'app-visitedjobs-list',
  templateUrl: './visitedjobs-list.component.html',
  styleUrls: ['./visitedjobs-list.component.css']
})
export class VisitedjobsListComponent implements OnInit, OnDestroy   {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  // public lstUseralljobs: any[];
	public url: any = "visitedjobs";
	public tempId: any;
    public editId: any;
    public lstVisitedjobs;
       public rows = [];
  public srch = [];
  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }

  ngOnInit(){
  	this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  	this.LoadVisitedjobs();
  }
     // Get department list  Api Call
  LoadVisitedjobs() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstVisitedjobs = data;
      this.dtTrigger.next();
      this.rows = this.lstVisitedjobs;
      this.srch = [...this.rows];
     
      });
  }



//search by designation
  searchDepartment(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.department.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by jobtype
  searchJobtype(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.jobtype.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by department
  searchDesignation(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.jobtitle.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }






  
   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
