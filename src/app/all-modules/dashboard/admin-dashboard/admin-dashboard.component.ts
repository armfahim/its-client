import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {

  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#667eea",
    b: "#764ba2",
  };
  public lineColors = {
    a: "#667eea",
    b: "#764ba2",
  };

  totalNoOfSuppliers:any;
  totalNoOfinvoices:any;
  pendingInvoices:any;
  dueInvoices:any;
  days:any;
  netDueOfDueInvoices:any;
  netDueOfPendingInvoices:any;
  totalDueAmount: any;
  dashboardResponse:any;

  constructor(
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.days = 1
    this.dashboardHighlights();
    this.getPendingInvoices();
  }

  setDays(val: string) {
    this.days = val;
    this.getPendingInvoices();
  }

  dashboardHighlights() {
    let params = {
      days : this.days
    };
    this.allModulesService.get("/v1/dashboard/highlights").subscribe((response: any) => {
      this.dueInvoices = response?.data.dueInvoices;
      this.totalNoOfinvoices = response?.data.totalInvoices;
      this.totalNoOfSuppliers = response?.data.totalSuppliers;
      this.dashboardResponse = response?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  getPendingInvoices() {
    let params = {
      days : this.days
    };
    this.allModulesService.getPendingInvoices("/v1/dashboard/pending-invoices",params).subscribe((response: any) => {
      this.pendingInvoices = response?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

}
