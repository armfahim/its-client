import { Component, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";
import { DatePipe } from "@angular/common";
declare const $: any;

@Component({
  selector: 'app-leavereports-list',
  templateUrl: './leavereports-list.component.html',
  styleUrls: ['./leavereports-list.component.css']
})
export class LeavereportsListComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: true })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
    public pipe = new DatePipe("en-US");
  public lstFees: any[];
  public url: any = "leavereports";

  constructor(private srvModuleService: AllModulesService) { }

  ngOnInit() {
     // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
  	     this.loadFees();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }
   // Get Fees List  Api Call
  loadFees() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstFees = data;
      this.dtTrigger.next();
    });
  }
  // destroy data table when leaving
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
