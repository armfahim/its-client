import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
declare const $: any;
@Component({
  selector: 'app-employeereports-list',
  templateUrl: './employeereports-list.component.html',
  styleUrls: ['./employeereports-list.component.css']
})
export class EmployeereportsListComponent implements OnInit {
@ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  // public lstUseralljobs: any[];
	public url: any = "employeereport";
	public tempId: any;
    public editId: any;
    public lstEmployee;
       public rows = [];
  public srch = [];
  constructor(
  		private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
    // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
  	this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  	this.LoadEmployee();
  }
     // Get department list  Api Call
  LoadEmployee() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstEmployee = data;
      this.dtTrigger.next();
      this.rows = this.lstEmployee;
      this.srch = [...this.rows];
     
      });
  }

  //search by designation
  searchEmployee(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name1.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by jobtype
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
