import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

declare const $: any;
@Component({
  selector: 'app-useralljobs-list',
  templateUrl: './useralljobs-list.component.html',
  styleUrls: ['./useralljobs-list.component.css']
})
export class UseralljobsListComponent implements OnInit, OnDestroy {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  // public lstUseralljobs: any[];
	public url: any = "useralljobs";
	public tempId: any;
    public editId: any;
    public lstUseralljobs;

    public rows = [];
  public srch = [];

  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
  	this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  	this.LoadUseralljobs();
  }
  // Get department list  Api Call
  LoadUseralljobs() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstUseralljobs = data;
      this.dtTrigger.next();
       this.rows = this.lstUseralljobs;
      this.srch = [...this.rows];
     
      });
  }

//search by designation
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.jobtitle.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by jobtype
  searchJob(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.jobtype.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by department
  searchDepartment(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.department.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
