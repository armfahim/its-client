import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare const $: any;
@Component({
  selector: 'app-archivedjobs-list',
  templateUrl: './archivedjobs-list.component.html',
  styleUrls: ['./archivedjobs-list.component.css']
})

export class ArchivedjobsListComponent implements OnInit, OnDestroy {
	@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  // public lstUseralljobs: any[];
	public url: any = "archivedjobs";
	public tempId: any;
    public editId: any;
    public lstArchivedjobs;

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
  	this.LoadArchivedjobs();
  }

  // Get department list  Api Call
  LoadArchivedjobs() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstArchivedjobs = data;
      this.dtTrigger.next();
       this.rows = this.lstArchivedjobs;
      this.srch = [...this.rows];
     
      });
  }


 deleteArchivedjobs() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
    	  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      
      this.LoadArchivedjobs();
      $("#delete_archivedjobs").modal("hide");
      this.toastr.success("Archived-jobs deleted sucessfully..!", "Success");
    });
  }

//search by Department
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

  //search by designation
  searchJobtitle(val) {
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
