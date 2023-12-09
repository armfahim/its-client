import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AllModulesService } from "src/app/all-modules/all-modules.service";

declare const $: any;
@Component({
  selector: "app-job-applicants",
  templateUrl: "./job-applicants.component.html",
  styleUrls: ["./job-applicants.component.css"],
})
export class JobApplicantsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "appliedCandidates";
  public allAppliedCandidates: any = [];
  constructor(private allModuleService: AllModulesService) {}

  ngOnInit() {
    this.getAppliedCandidates();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getAppliedCandidates() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allAppliedCandidates = data;
      this.dtTrigger.next();
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
