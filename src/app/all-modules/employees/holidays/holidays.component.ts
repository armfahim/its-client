import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
declare const $: any;
@Component({
  selector: "app-holidays",
  templateUrl: "./holidays.component.html",
  styleUrls: ["./holidays.component.css"],
})
export class HolidaysComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  lstHolidays: any[];
  url: any = "holidays";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addHolidayForm: FormGroup;
  public editHolidayForm: FormGroup;
  public editHolidayDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadholidays();

    this.addHolidayForm = this.formBuilder.group({
      HolidayName: ["", [Validators.required]],
      Holidaydate: ["", [Validators.required]],
      DaysName: ["", [Validators.required]],
    });

    // Edit Contact Form Validation And Getting Values

    this.editHolidayForm = this.formBuilder.group({
      editHolidayName: ["", [Validators.required]],
      editHolidayDate: ["", [Validators.required]],
      editDaysName: ["", [Validators.required]],
    });
  }

  // Get Employee  Api Call
  loadholidays() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstHolidays = data;
      this.dtTrigger.next();
      this.rows = this.lstHolidays;
      this.srch = [...this.rows];
    });
  }

  // Add holidays Modal Api Call

  addholidays() {
    if (this.addHolidayForm.valid) {
      let holiday = this.pipe.transform(
        this.addHolidayForm.value.Holidaydate,
        "dd-MM-yyyy"
      );
      let obj = {
        title: this.addHolidayForm.value.HolidayName,
        holidaydate: holiday,
        day: this.addHolidayForm.value.DaysName,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadholidays();
      $("#add_holiday").modal("hide");
      this.addHolidayForm.reset();
      this.toastr.success("Holidays added", "Success");
    }
  }

  from(data) {
    this.editHolidayDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit holidays Modal Api Call

  editHolidays() {
    if (this.editHolidayForm.valid) {
      let obj = {
        title: this.editHolidayForm.value.editHolidayName,
        holidaydate: this.editHolidayDate,
        day: this.editHolidayForm.value.editDaysName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadholidays();
      $("#edit_holiday").modal("hide");
      this.toastr.success("Holidays Updated succesfully", "Success");
    }
  }

  // Delete holidays Modal Api Call

  deleteHolidays() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.loadholidays();
      $("#delete_holiday").modal("hide");
      this.toastr.success("Holidays Deleted", "Success");
    });
  }

  // To Get The holidays Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstHolidays.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstHolidays[index];
    this.editHolidayForm.setValue({
      editHolidayName: toSetValues.title,
      editHolidayDate: toSetValues.holidaydate,
      editDaysName: toSetValues.day,
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
