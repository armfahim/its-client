import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { PaperworksService } from '../../services/paperworks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperworkBreakdown } from '../../model/paperwork-breakdown';
import { Paperworks } from '../../model/paperworks';

@Component({
  selector: 'app-paperworks-view',
  templateUrl: './paperworks-view.component.html',
  styleUrls: ['./paperworks-view.component.css']
})
export class PaperworksViewComponent implements OnInit {

  paperworkId:any;
  // paperworkBreakdown: PaperworkBreakdown = new PaperworkBreakdown();

  paperworkObj:Paperworks = new Paperworks();

  paperworkBreakdown: PaperworkBreakdown[] = [];
  totalMerchantSales: number = 0;
  totalSalesTax: number = 0;
  totalInsideSales: number = 0;
  totalSalesRecord: number = 0;
  totalCreditCard: number = 0;
  totalDebitCard: number = 0;
  totalCreditDebitCard: number = 0;
  totalEBT: number = 0;
  totalExpense: number = 0;
  totalOfficeExpense: number = 0;
  totalTrustFund: number = 0;
  totalHouseAc: number = 0;
  totalStoreDeposit: number = 0;
  totalInsideSalesBreakdown: number = 0;
  totalCashPurchase: number = 0;
  totalInsideSalesColumn: number = 0;
  totalCashOverShort: number = 0;

  constructor(private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private paperworksService: PaperworksService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.paperworkId = this.route.snapshot.params["id"];
    if(this.paperworkId){
      this.loadAllDaysDataByPaperworkId();
      this.getPaperworkInfoWithBreakdown();
    }
  }

  loadAllDaysDataByPaperworkId() {
    this.allModulesService.findById(this.paperworkId,"v1/paperwork/breakdown/find/all/by/paperwork").subscribe((response: any) => {
      this.paperworkBreakdown = response?.data;

      this.paperworkBreakdown.forEach(paperwork => {
        this.totalMerchantSales += paperwork.merchantSale;
        this.totalSalesTax += paperwork.salesTax;
        this.totalInsideSales += paperwork.insideSales;
        this.totalSalesRecord += paperwork.totalSalesRecord;
        this.totalCreditCard += paperwork.creditCard;
        this.totalDebitCard += paperwork.debitCard;
        this.totalCreditDebitCard += paperwork.totalCreditDebitCard;
        this.totalEBT += paperwork.ebt;
        this.totalExpense += paperwork.expense;
        this.totalOfficeExpense += paperwork.officeExpense;
        this.totalTrustFund += paperwork.trustFund;
        this.totalHouseAc += paperwork.houseAc;
        this.totalStoreDeposit += paperwork.storeDeposit;
        this.totalInsideSalesBreakdown += paperwork.totalInsideSalesBreakdown;
        this.totalCashPurchase += paperwork.totalCashPurchase;
        this.totalInsideSalesColumn += paperwork.totalInsideSales;
        this.totalCashOverShort += paperwork.cashOverShort;
      });

    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  getPaperworkInfoWithBreakdown() {
    this.allModulesService.findById(this.paperworkId,"v1/paperwork/find/details").subscribe((data: any) => {
      this.paperworkObj = data?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

}
