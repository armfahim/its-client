import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";

declare const $: any;

@Component({
  selector: "app-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.css"],
})
export class InvoiceReportComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  invoices: any = [];
  id: any;
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

    //get all invoices
    this.getAllInvoices();
  }

  //get all invoices
  getAllInvoices() {
    this.allModulesService.get("invoiceReport").subscribe((res) => {
      this.invoices = res;
      this.dtTrigger.next();
      this.rows = this.invoices;
      this.srch = [...this.rows];
    });
  }

  //getting id for selected row
  deleteInvoice(estimate) {
    this.id = estimate.id;
  }

  // delete method for deleting rows
  delete() {
    let id: any = Number(this.id);
    this.allModulesService.delete(id, "invoiceReport").subscribe((res) => {
      this.router.navigate(["/reports/edit-invoice-report"]);
      this.getAllInvoices();
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
      return d.invoice_date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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
      return d.due_date.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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
      return d.client.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
