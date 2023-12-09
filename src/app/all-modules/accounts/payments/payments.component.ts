import { Component, OnDestroy, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { Subject } from "rxjs";

declare const $: any;
@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"],
})
export class PaymentsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  public url: any = "payments";
  public allPayments: any = [];
  public dtTrigger: Subject<any> = new Subject();
  constructor(private allModuleService: AllModulesService) {}

  ngOnInit() {
    //get payments
    this.getPayments();

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // get payment API call
  getPayments() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allPayments = data;
      this.dtTrigger.next();
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
