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
  selector: "app-assets-main",
  templateUrl: "./assets-main.component.html",
  styleUrls: ["./assets-main.component.css"],
})
export class AssetsMainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "assets";
  public allAssets: any = [];
  public addAssets: FormGroup;
  public editAssets: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public editPurchaseDateFormat;
  public editPurchaseToDateFormat;
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

    // get assets data from API

    this.getAssets();

    // Add Assets Form Validation And Getting Values

    this.addAssets = this.formBuilder.group({
      assetName: ["", [Validators.required]],
      assetId: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required]],
      purchaseTo: ["", [Validators.required]],
      warranty: ["", [Validators.required]],
      value: ["", [Validators.required]],
      assetUser: ["", [Validators.required]],
      assetStatus: ["", [Validators.required]],
    });

    // Edit Assets Form Validation And Getting Values

    this.editAssets = this.formBuilder.group({
      editAssetsName: ["", [Validators.required]],
      editPurchaseDate: ["", [Validators.required]],
      editPurchaseTo: ["", [Validators.required]],
      editWarranty: ["", [Validators.required]],
      editvalue: ["", [Validators.required]],
      editAssetUser: ["", [Validators.required]],
      editAssetId: ["", [Validators.required]],
      editAssetStatus: ["", [Validators.required]],
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
    this.allAssets = [];
    this.getAssets();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //get data for data table
  getAssets() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allAssets = data;
      this.rows = this.allAssets;
      this.srch = [...this.rows];
    });
  }

  // Add Assets Modal Api Call
  addAssetsSubmit() {
    if (this.addAssets.valid) {
      let purchaseDateFormat = this.pipe.transform(
        this.addAssets.value.purchaseDate,
        "dd-MM-yyyy"
      );
      let purchaseToDateFormat = this.pipe.transform(
        this.addAssets.value.purchaseTo,
        "dd-MM-yyyy"
      );
      let obj = {
        assetName: this.addAssets.value.assetName,
        assetId: this.addAssets.value.assetId,
        purchaseDate: purchaseDateFormat,
        warrenty: this.addAssets.value.warranty,
        Amount: this.addAssets.value.value,
        assetUser: this.addAssets.value.assetUser,
        warrentyEnd: purchaseToDateFormat,
        assetStatus: this.addAssets.value.assetStatus,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getAssets();
      $("#add_asset").modal("hide");
      this.addAssets.reset();
      this.toastr.success("Assets is added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editPurchaseDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editPurchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Assets Modal Api Call
  editAssetSubmit() {
    if (this.editAssets.valid) {
      let obj = {
        assetName: this.editAssets.value.editAssetsName,
        assetId: this.editAssets.value.editAssetId,
        purchaseDate: this.editPurchaseDateFormat,
        warrenty: this.editAssets.value.editWarranty,
        Amount: this.editAssets.value.editvalue,
        assetUser: this.editAssets.value.editAssetUser,
        warrentyEnd: this.editPurchaseToDateFormat,
        assetStatus: this.editAssets.value.editAssetStatus,
        id: this.editId,
      };
      this.allModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getAssets();
      $("#edit_asset").modal("hide");
      this.toastr.success("Assets is edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // for set values to editassets form
  edit(value) {
    this.editId = value;
    const index = this.allAssets.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allAssets[index];
    this.editAssets.setValue({
      editAssetsName: toSetValues.assetName,
      editPurchaseDate: toSetValues.purchaseDate,
      editPurchaseTo: toSetValues.warrentyEnd,
      editWarranty: toSetValues.warrenty,
      editvalue: toSetValues.Amount,
      editAssetUser: toSetValues.assetUser,
      editAssetId: toSetValues.assetId,
      editAssetStatus: toSetValues.assetStatus,
    });
  }

  // Delete Assets Modal Api Call
  deleteAssets() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getAssets();
    $("#delete_asset").modal("hide");
    this.toastr.success("Assets is deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetUser.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetStatus.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase

  searchByPurchase(val) {
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

  //search by warranty
  searchByWarranty(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.warrentyEnd.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  //for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
