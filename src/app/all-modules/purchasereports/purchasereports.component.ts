import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from '../all-modules.service';
import * as echarts from 'echarts';

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
  searchSupplierId: any;
  searchMonth:any;
  searchYear:any;
  years:any;
  public chartOptions: any;


  constructor(
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private invoiceService: InvoiceService,
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

    // Search Form
    this.searchForm = this.formBuilder.group({
      supplierId:["",[]],
      month:["",[]],
      year:["",[]]
    })

    //
    // prettier-ignore
    // prettier-ignore
    let dataAxis = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // prettier-ignore
    let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
    let yMax = 500;
    let dataShadow = [];

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    this.chartOptions = {
      title: {
        text: 'Month wise comparison',
        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
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
            return tar && tar.axisValue + ' : ' + tar.data;
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
            position: 'top'
          },
          data: data
        },
        // {
        //   name: 'Income',
        //   type: 'bar',
        //   stack: 'Total',
        //   label: {
        //     show: true,
        //     position: 'top'
        //   },
        //   data: data
        // },
      ]
    }
  }

  loadYearsAndMonths() {
    this.allModulesService.get("/v1/invoice-details/distinct/years-months").subscribe((response: any) => {
        this.years = response?.data.years;
      }, (error) => {
        this.toastr.error(error.error.message);
      });
  }

  loadAllSuppliers() {
    this.allModulesService.get("/v1/supplier-details/all").subscribe((response: any) => {
      this.suppliers = response?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  onSearch(){
    this.searchFormData = this.searchForm.value;
    this.searchFormData.fromInvoiceDate = this.datePipe.transform(this.searchFormData.fromInvoiceDate, 'yyyy-MM-dd');
    this.searchFormData.toInvoiceDate = this.datePipe.transform(this.searchFormData.toInvoiceDate, 'yyyy-MM-dd');
    // this.rerender();
  }

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }


}
