import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";

declare const $: any;
@Component({
  selector: "app-tickets-content",
  templateUrl: "./tickets-content.component.html",
  styleUrls: ["./tickets-content.component.css"],
})
export class TicketsContentComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public url: any = "tickets";
  public allTickets: any = [];
  public addTicketForm: FormGroup;
  public editTicketForm: FormGroup;
  public editId: any;
  public tempId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public editCreated: any;
  public editLastDate: any;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.getTickets();
    // Add Ticket Form Validation And Getting Values
    this.addTicketForm = this.formBuilder.group({
      ticketSubject: ["", [Validators.required]],
      ticketId: ["", [Validators.required]],
      assignStaff: ["", [Validators.required]],
      clientName: ["", [Validators.required]],
      PriorityName: ["", [Validators.required]],
      ccName: ["", [Validators.required]],
      AssignName: ["", [Validators.required]],
      addFlowers: ["", [Validators.required]],
    });

    // Edit Ticket Form Validation And Getting Values

    this.editTicketForm = this.formBuilder.group({
      editTicketSubject: ["", [Validators.required]],
      editTicketId: ["", [Validators.required]],
      editAssignStaff: ["", [Validators.required]],
      editClientName: ["", [Validators.required]],
      editPriorityName: ["", [Validators.required]],
      editccName: ["", [Validators.required]],
      editAssignName: ["", [Validators.required]],
      editaddFlowers: ["", [Validators.required]],
    });

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.allTickets = [];
    this.getTickets();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getTickets() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allTickets = data;
      this.rows = this.allTickets;
      this.srch = [...this.rows];
    });
  }

  // Add Ticket Modal Api Call

  addTickets() {
    if (this.addTicketForm.valid) {
      // let created = this.pipe.transform(
      //   "12-05-2020",
      //   "dd-MM-yyyy"
      // );
      // let lastDate = this.pipe.transform(
      //   "13-05-2020",
      //   "dd-MM-yyyy"
      // );
      let obj = {
        ticketSubject: this.addTicketForm.value.ticketSubject,
        ticketId: this.addTicketForm.value.ticketId,
        assignedStaff: this.addTicketForm.value.assignStaff,
        client: this.addTicketForm.value.clientName,
        cc: this.addTicketForm.value.ccName,
        priority: this.addTicketForm.value.PriorityName,
        assigne: this.addTicketForm.value.AssignName,
        addfollow: this.addTicketForm.value.addFlowers,
        createdDate: "05-05-2020",
        lastReply: "11-05-2020",
        status: "Pending",
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getTickets();
      $("#add_ticket").modal("hide");
      this.addTicketForm.reset();
      this.toastr.success("Tickets added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // Edit Ticket Modal Api Call

  editTicket() {
    let obj = {
      ticketSubject: this.editTicketForm.value.editTicketSubject,
      ticketId: this.editTicketForm.value.editTicketId,
      assignedStaff: this.editTicketForm.value.editAssignStaff,
      client: this.editTicketForm.value.editClientName,
      cc: this.editTicketForm.value.editccName,
      priority: this.editTicketForm.value.editPriorityName,
      assigne: this.editTicketForm.value.editAssignName,
      addfollow: this.editTicketForm.value.editaddFlowers,
      createdDate: "05-09-2020",
      lastReply: "06-09-2020",
      status: "Approved",
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getTickets();
    $("#edit_ticket").modal("hide");
    this.editTicketForm.reset();
    this.toastr.success("Tickets updated", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allTickets.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allTickets[index];
    this.editTicketForm.setValue({
      editTicketSubject: toSetValues.ticketSubject,
      editTicketId: toSetValues.ticketId,
      editAssignStaff: toSetValues.assignedStaff,
      editClientName: toSetValues.client,
      editPriorityName: toSetValues.priority,
      editccName: toSetValues.cc,
      editAssignName: toSetValues.assigne,
      editaddFlowers: toSetValues.addfollow,
    });
  }

  // Delete Ticket Modal Api Call
  deleteTicket() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getTickets();
    $("#delete_ticket").modal("hide");
    this.toastr.success("Tickets deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assignedStaff.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
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

  searchPriority(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.priority.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.createdDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  //search by warranty
  searchTo(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.lastReply.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
