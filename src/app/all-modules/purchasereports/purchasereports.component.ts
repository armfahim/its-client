import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from '../all-modules.service';
import * as echarts from 'echarts';
import { PurchasereportsService } from '../services/purchasereports.service';

@Component({
  selector: 'app-purchasereports',
  templateUrl: './purchasereports.component.html',
  styleUrls: ['./purchasereports.component.css']
})
export class PurchasereportsComponent implements OnInit {

  public innerHeight: any;
  //Search Form
  public searchForm: FormGroup;
  searchFormData : any;
  suppliers: [] = [];
  branches : [] = [];
  searchSupplierId: any;
  searchBranchId:any;
  searchMonth:any;
  searchYear:any;
  years:any;
  monthlyInvoiceAmount:any;
  totalPurchase:any;
  selectedYear:any;
  yearAndMonthsObj:any;
  detailsInvoice:any;
  supplierName:any;
  public chartOptions: any;


  constructor(
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private invoiceService: InvoiceService,
    private purchaseReportsService: PurchasereportsService
    ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
    this.loadYearsAndMonths();
    this.loadAllSuppliers();
    this.loadAllShopBranches();
    this.getPurchaseAmountBySupplier();

    // Search Form
    this.searchForm = this.formBuilder.group({
      supplierId:["",[]],
      branchId:["",[]],
      month:["",[]],
      year:["",[]]
    })
  }

  prepareBarChart(){
     // prettier-ignore
     let dataAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     // prettier-ignore
     let data ;
     if(this.monthlyInvoiceAmount) {
       data = this.monthlyInvoiceAmount.monthlyInvoiceAmount.map(item => Number(item.monthlyTotal));
     }else{
        data = [];
     }
    //  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
     let yMax = 500;
     let dataShadow = [];

     for (let i = 0; i < data.length; i++) {
       dataShadow.push(yMax);
     }
     this.chartOptions = {
       title: {
         text: 'Month wise purchase comparison',
       },
       tooltip: {
         trigger: 'axis',
         axisPointer: {
           type: 'shadow'
         },
         formatter: function (params: any) {
           let tar;
           if (params[0]) {
             tar = params[0];
             let monthName;
             if(tar.axisValue == 'Jan') {
               monthName = 'January'
             }else if(tar.axisValue == 'Feb') monthName = 'February'
             else if(tar.axisValue == 'Mar') monthName = 'March'
             else if(tar.axisValue == 'Apr') monthName = 'April'
             else if(tar.axisValue == 'May') monthName = 'May'
             else if(tar.axisValue == 'Jun') monthName = 'June'
             else if(tar.axisValue == 'Jul') monthName = 'July'
             else if(tar.axisValue == 'Aug') monthName = 'August'
             else if(tar.axisValue == 'Sep') monthName = 'September'
             else if(tar.axisValue == 'Oct') monthName = 'October'
             else if(tar.axisValue == 'Nov') monthName = 'November'
             else if(tar.axisValue == 'Dec') monthName = 'December'
             return tar && monthName + ' : $' + tar.data;
           }
         }
       },
       grid: {
         left: '3%',
         right: '4%',
         bottom: '3%',
         containLabel: true
       },
       xAxis: {
         data: dataAxis,
         axisLabel: {
           inside: true,
           color: '#fff'
         },
         axisTick: {
           show: true
         },
         axisLine: {
           show: true
         },
         z: 10
       },
       yAxis: {
         axisLine: {
           show: true
         },
         axisTick: {
           show: true
         },
         axisLabel: {
           color: '#999'
         }
       },
       dataZoom: [
         {
           type: 'inside'
         }
       ],
       series: [
         {
           type: 'bar',
           showBackground: true,
           itemStyle: {
             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
               { offset: 0, color: '#83bff6' },
               { offset: 0.5, color: '#188df0' },
               { offset: 1, color: '#188df0' }
             ])
           },
           emphasis: {
             itemStyle: {
               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                 { offset: 0, color: '#2378f7' },
                 { offset: 0.7, color: '#2378f7' },
                 { offset: 1, color: '#83bff6' }
               ])
             }
           },
           label: {
             show: true,
             position: 'top',
             formatter: (params: any) => ('$' + params.value),
             fontWeight: 'bold',
             fontStyle: 'italic', // Add this line to set the font style to italic
             fontFamily: 'Arial, sans-serif' // Add this line to set a custom font family
           },
           data: data
         },
       ]
     }
  }

  findBySupplier() {
    if(!this.searchSupplierId) return;

    this.allModulesService.findById(this.searchSupplierId,"v1/invoice-details/find/supplier").subscribe((data: any) => {
      this.detailsInvoice = data?.data;
      this.supplierName = data?.data[0].supplierName;
      console.log(this.detailsInvoice);
    },(error) => {
      // Extract error message from the API response
      const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
      this.toastr.error(customErrorMessage, "",{ timeOut: 5000 });
      return;
    });
  }

  getPurchaseAmountBySupplierAndYearInMonth() {
    if(!this.selectedYear){
      // this.toastr.info("Please select a year", "",{ timeOut: 5000 });
      // return;
      this.selectedYear = new Date().getFullYear().toString();
    }
    this.detailsInvoice = null;
    let params = {
      year: this.selectedYear,
      supplierId : this.searchSupplierId ? this.searchSupplierId : "",
      branchId : this.searchBranchId ? this.searchBranchId : ""
    };

    this.purchaseReportsService.getPurchaseAmountBySupplierAndYearInMonth("/v1/purchase/amount/by/supplier/year-month",params).subscribe((response: any) => {
      this.monthlyInvoiceAmount = response?.data;
      this.prepareBarChart();
    }, (error) => {
      // Extract error message from the API response
      const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
      this.toastr.error(customErrorMessage, "",{ timeOut: 5000 });
      return;
    });
  }


  getPurchaseAmountBySupplier() {
    let params = {
      supplierId : this.searchSupplierId ? this.searchSupplierId : "",
      branchId : this.searchBranchId ? this.searchBranchId : "",
    };

    this.purchaseReportsService.getPurchaseAmountBySupplier("/v1/purchase/amount/by/supplier",params).subscribe((response: any) => {
      this.totalPurchase = response?.data;
      this.getPurchaseAmountBySupplierAndYearInMonth();
    }, (error) => {
      const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
      this.toastr.error(customErrorMessage, "",{ timeOut: 5000 });
      return;
    });
  }

  hideDetails(){
    this.detailsInvoice = null;
  }

  loadYearsAndMonths() {
    this.allModulesService.get("/v1/invoice-details/distinct/years-months").subscribe((response: any) => {
        this.years = response?.data.years;
        this.yearAndMonthsObj = response;
        this.selectedYear = this.yearAndMonthsObj?.data.currentYear;
      }, (error) => {
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.error(customErrorMessage, "",{ timeOut: 5000 });
        return;
      });
  }

  loadAllSuppliers() {
    this.allModulesService.get("/v1/supplier-details/all").subscribe((response: any) => {
      this.suppliers = response?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  loadAllShopBranches(){
    this.allModulesService.get("/v1/shop/branch/find/all").subscribe((response: any) => {
      this.branches = response?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  onSearch(){
    this.searchFormData = this.searchForm.value;
    this.searchFormData.fromInvoiceDate = this.datePipe.transform(this.searchFormData.fromInvoiceDate, 'yyyy-MM-dd');
    this.searchFormData.toInvoiceDate = this.datePipe.transform(this.searchFormData.toInvoiceDate, 'yyyy-MM-dd');
  }

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }


}
