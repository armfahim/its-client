import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';
import { PaperworksService } from '../../services/paperworks.service';
import { ActivatedRoute } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { PaperworkBreakdown } from '../../model/paperwork-breakdown';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-paperworks-add',
  templateUrl: './paperworks-add.component.html',
  styleUrls: ['./paperworks-add.component.css']
})
export class PaperworksAddComponent implements OnInit, OnDestroy  {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  public addPaperworkBreakdownForm: FormGroup;
  subscription: Subscription;
  // sharedPaperworkObj: any;

  paperworkId!: number;
  paperworkObj:any;
  minDate:any;
  maxDate:any;
  dateValues:any;
  dateValue: any;
  
  //Model
  paperworkBreakdown: PaperworkBreakdown = new PaperworkBreakdown();
  loading = false;

  //Days List
  first10 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  second10 = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
  third10 = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  monthMap: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };

  constructor(
    private formBuilder: FormBuilder,
    private paperworksService: PaperworksService,
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.subscription = this.paperworksService.currentPaperwork.subscribe(obj => this.sharedPaperworkObj = obj);
    this.paperworkId = this.route.snapshot.params["id"];
    if(this.paperworkId){
      this.getPaperworkInfoWithBreakdown();
    }

    //Initialization of add paperwork form
    this.addPaperworkBreakdownForm = this.formBuilder.group({
      paperworkDate: ["", [Validators.required]],
      merchantSale:["", [Validators.required]],
      salesTax:["",[]],
      insideSales:["",[Validators.required]],
      totalSalesRecord:["",[Validators.required]],
      creditCard:["",[]],
      debitCard:["",[]],
      totalCreditDebitCard:["",[]],
      ebt:["",[]],
      expense:["",[]],
      officeExpense:["",[]],
      trustFund:["",[]],
      houseAc:["",[]],
      storeDeposit:["",[]],
      totalInsideSalesBreakdown:["",[]],
      totalCashPurchase: ["",[]],
      totalInsideSales:["",[]], // Sum of Including totalCashPurchase
      cashOverShort: ["",[]],
      notes: ["",[]],
      items: this.formBuilder.array([]),
    })
    this.addPaperworkBreakdownForm.get("salesTax").disable();
    this.addPaperworkBreakdownForm.get("totalSalesRecord").disable();
    this.addPaperworkBreakdownForm.get("totalInsideSalesBreakdown").disable();
    this.addPaperworkBreakdownForm.get("totalCashPurchase").disable();
    this.addPaperworkBreakdownForm.get("totalInsideSales").disable();
    this.addPaperworkBreakdownForm.get("cashOverShort").disable();
    this.addItems();
  }

  setCalendar() {
    let year: number = parseInt(this.paperworkObj.year, 10);
    let month: number = this.monthMap[this.paperworkObj.month];

    this.minDate = new Date(year, month, 1);
    this.maxDate =  new Date(year, month, 30);

    this.dateValues = [new Date(year, month, 1), new Date(year, month, 14), new Date(year, month, 4), new Date(year, month, 25)];
    this.dateValue = new Date(year, month, 14);
    this.dateValues;
  }

  onChange(args: any) {
    args.value;    
}

  customDates(args: any): void {
    if (args.date.getDay() === 0 || args.date.getDay() === 6 ) {
        // To highlight the week end of every month
        args.element.classList.add('e-highlightweekend');
    }
  }

  //Add new Invoice
  public onAdd() {
    this.loading = true;
    this.paperworkBreakdown.merchantSale;
  }

  formatAmountCurrency() {
  }

  convertToPaperworkDate(value:any){
    let year: number = parseInt(this.paperworkObj.year, 10);
    let month: number = this.monthMap[this.paperworkObj.month];
    let date: number = parseInt(value, 10);
    this.paperworkBreakdown.paperworkDate = new Date(year, month,date);
    alert(new Date(year, month,date));
  }

  checkMerchantAndInsideSaleAmt(){
    if (this.paperworkBreakdown.insideSales > this.paperworkBreakdown.merchantSale) {
      this.toastr.warning("Insides sales can't be more than merchant sales!","Warning",{ timeOut: 5000 });
      this.paperworkBreakdown.insideSales = null;
    }
  }

  rerender(): void {
  }

  getPaperworkInfoWithBreakdown() {
    this.allModulesService.findById(this.paperworkId,"v1/paperwork/find").subscribe((data: any) => {
      this.paperworkObj = data?.data;
      this.setCalendar();
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  get items(){
    return this.addPaperworkBreakdownForm.get('items') as FormArray;
  }

  deleteItem(index: number){
    this.items.removeAt(index);
  }

  addItems(){
    this.items.push(
      this.formBuilder.group({
        itemName: [''],
        cashPurchaseAmount: [''],
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
