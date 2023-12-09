import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";

declare const $: any;
@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.css"],
})
export class ExpensesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "expenses";
  public allExpenses: any = [];
  public addExpensesForm: FormGroup;
  public editExpensesForm: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public dateStatus: boolean = false;
  public editPurchaseDateFormat;
  public editPurchaseToDateFormat;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.getExpenses();

    // Add Expenses Form Validation And Getting Values

    this.addExpensesForm = this.formBuilder.group({
      itemName: ["", [Validators.required]],
      purchaseFrom: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required]],
      purchasedBy: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      paidBy: ["", [Validators.required]],
    });

    // Edit Expenses Form Validation And Getting Values

    this.editExpensesForm = this.formBuilder.group({
      itemName: ["", [Validators.required]],
      purchaseFrom: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required]],
      purchasedBy: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      paidBy: ["", [Validators.required]],
    });
    // for data table configuration
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
    this.allExpenses = [];
    this.getExpenses();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  getExpenses() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allExpenses = data;
      this.rows = this.allExpenses;
      this.srch = [...this.rows];
    });
  }

  // Add Expenses Modal Api Call

  addExpenses() {
    if (this.addExpensesForm.valid) {
      let purchaseToDateFormat = this.pipe.transform(
        this.addExpensesForm.value.purchaseDate,
        "dd-MM-yyyy"
      );


      let obj = {
        item: this.addExpensesForm.value.itemName,
        purchaseFrom: this.addExpensesForm.value.purchaseFrom,
        purchaseDate: purchaseToDateFormat,
        purchasedBy: this.addExpensesForm.value.purchasedBy,
        amount: this.addExpensesForm.value.amount,
        paidby: this.addExpensesForm.value.paidBy,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getExpenses();
      $("#add_expense").modal("hide");
      this.addExpensesForm.reset();
      this.toastr.success("Expenses added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editPurchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Expenses Modal Api Call

  editExpenses() {
    if (this.editExpensesForm.valid) {
      let obj = {
        item: this.editExpensesForm.value.itemName,
        purchaseFrom: this.editExpensesForm.value.purchaseFrom,
        purchaseDate: this.editPurchaseToDateFormat,
        purchasedBy: this.editExpensesForm.value.purchasedBy,
        amount: this.editExpensesForm.value.amount,
        paidby: this.editExpensesForm.value.paidBy,
        id: this.editId,
      };
      this.allModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getExpenses();
      $("#edit_expense").modal("hide");
      this.toastr.success("Expenses edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  edit(value) {
    this.editId = value;
    const index = this.allExpenses.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allExpenses[index];
    this.editExpensesForm.setValue({
      itemName: toSetValues.item,
      purchaseFrom: toSetValues.purchaseFrom,
      purchaseDate: toSetValues.purchaseDate,
      purchasedBy: toSetValues.purchasedBy,
      amount: toSetValues.amount,
      paidBy: toSetValues.paidby,
    });
  }

  // Delete Expenses Modal Api Call

  deleteTicket() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getExpenses();
    $("#delete_expense").modal("hide");
    this.toastr.success("Expenses deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.item.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search purchased by

  purchasedBy(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.purchasedBy.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search paid by

  paidBy(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.paidby.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by from
  searchByFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.purchaseDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  //search by to
  searchByTo(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.purchaseDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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
  //for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
