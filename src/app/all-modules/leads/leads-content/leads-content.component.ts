import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

@Component({
  selector: "app-leads-content",
  templateUrl: "./leads-content.component.html",
  styleUrls: ["./leads-content.component.css"],
})
export class LeadsContentComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "leads";
  public allLeads: any = [];
  constructor(private allModuleService: AllModulesService) {}

  ngOnInit() {
    this.getLeads();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getLeads() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allLeads = data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
