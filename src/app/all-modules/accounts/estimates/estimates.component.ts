import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";

import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
@Component({
  selector: "app-estimates",
  templateUrl: "./estimates.component.html",
  styleUrls: ["./estimates.component.css"],
})
export class EstimatesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public estimates = [];
  public id;
  public rows = [];
  public srch = [];
  public pipe = new DatePipe("en-US");
  public dtTrigger: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private allModulesService: AllModulesService
  ) {}

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    //to get all estimates
    this.getAllEstimates();
  }

  //get id for the selected delete row
  deleteEstimate(estimate) {
    this.id = estimate.id;
  }

  //get estimate list
  getAllEstimates() {
    this.allModulesService.get("estimates").subscribe((res) => {
      this.estimates = res;
      this.dtTrigger.next();
      this.rows = this.estimates;
      this.srch = [...this.rows];
    });
  }

  //delete method of estimate list
  delete() {
    let id: any = Number(this.id);
    this.allModulesService.delete(id, "estimates").subscribe((res) => {
      this.router.navigate(["/accounts/estimates"]);
      this.getAllEstimates();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
  }

  //search by from date
  searchFromDate(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.estimate_date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by to date
  searchToDate(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.expiry_date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by status

  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
