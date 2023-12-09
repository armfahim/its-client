import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';

declare const $: any;
@Component({
  selector: 'app-promotion-main',
  templateUrl: './promotion-main.component.html',
  styleUrls: ['./promotion-main.component.css']
})
export class PromotionMainComponent implements OnInit {
  lstPromotion: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = 'promotionmain';


  public rows = [];
  public srch = [];
  public statusValue
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe('en-US');
  public tempId: any;
  public editId: any;

  public addPromotionForm: FormGroup;
  public editPromotionForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private srvModuleService: AllModulesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadPromotion();
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    }


    this.addPromotionForm = this.formBuilder.group({
      proFor: ['', [Validators.required]],
      proFrom: ['', [Validators.required]],
      proTo: ['', [Validators.required]],
      proDate: ['', [Validators.required]]
    });

    this.editPromotionForm = this.formBuilder.group({
      proFor: ['', [Validators.required]],
      proFrom: ['', [Validators.required]],
      proTo: ['', [Validators.required]],
      proDate: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  trainer Api Call
  loadPromotion() {
    this.srvModuleService.get(this.url).subscribe(data => {
      this.lstPromotion = data;
      this.rows = this.lstPromotion;
      this.srch = [...this.rows];
    });
  }

  // Add  goal type  Modal Api Call
  addPromotion() {
    if (this.addPromotionForm.valid) {
      let promoDate = this.pipe.transform(this.addPromotionForm.value.proDate, 'dd-MM-yyyy');
      let obj = {
        employee: this.addPromotionForm.value.proFor,
        department: 'Web development',
        promotionFrom: this.addPromotionForm.value.proFrom,
        promotionTo: this.addPromotionForm.value.proTo,
        promotionDate: promoDate,
      };
      this.srvModuleService.add(obj, this.url).subscribe(data => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadPromotion();
      $('#add_promotion').modal('hide');
      this.addPromotionForm.reset();
      this.toastr.success("Promotion added sucessfully...!", 'Success')
    }
  }

  editPromotion() {
    if (this.editPromotionForm.valid) {
      let promoDate = this.pipe.transform(this.editPromotionForm.value.proDate, 'dd-MM-yyyy');
      let obj = {
        employee: this.editPromotionForm.value.proFor,
        department: 'Web development',
        promotionFrom: this.editPromotionForm.value.proFrom,
        promotionTo: this.editPromotionForm.value.proTo,
        promotionDate: promoDate,
        id: this.editId
      };
      this.srvModuleService.update(obj, this.url).subscribe(data1 => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadPromotion();
      $('#edit_promotion').modal('hide');
      this.toastr.success("Promotion Updated sucessfully...!", 'Success')
    }
  }


  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value
    const index = this.lstPromotion.findIndex(item => {
      return item.id === value;
    })
    let toSetValues = this.lstPromotion[index]
    this.editPromotionForm.setValue({
      proFor: toSetValues.employee,
      proTo: toSetValues.promotionTo,
      proFrom: toSetValues.promotionFrom,
      proDate: toSetValues.promotionDate
    });
  }


  deletePromotion() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe(data => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadPromotion();
    $('#delete_promotion').modal('hide');
    this.toastr.success("Promotion  deleted sucessfully..!", 'Success');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
