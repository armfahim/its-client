import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';
import { PaperworksService } from '../../services/paperworks.service';
import { ActivatedRoute } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { PaperworkBreakdown } from '../../model/paperwork-breakdown';

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
  isShort : boolean = false;
  
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

    //Add new Invoice
    public onAdd() {
      this.loading = true;
      this.paperworkBreakdown.merchantSale;
      this.paperworkBreakdown.cashPurchaseList = this.items.value;
      if(this.addPaperworkBreakdownForm.invalid){
        this.toastr.info("Please insert valid data");
        return;
      }
    }

  calculateSalesRecordAmt(){
    if (this.paperworkBreakdown.insideSales > this.paperworkBreakdown.merchantSale) {
      this.toastr.warning("Insides sales can't be more than merchant sales!","Warning",{ timeOut: 3000 });
      this.paperworkBreakdown.insideSales = null;
      this.paperworkBreakdown.salesTax = null;
      return;
    }else{
      this.paperworkBreakdown.salesTax = this.paperworkBreakdown.merchantSale - this.paperworkBreakdown.insideSales;
      this.paperworkBreakdown.totalSalesRecord = this.paperworkBreakdown.insideSales + this.paperworkBreakdown.salesTax;
    }
  }

  calculateTotalCreditDebit(){
    this.paperworkBreakdown.totalCreditDebitCard = (this.paperworkBreakdown.creditCard ? this.paperworkBreakdown.creditCard : 0) 
                                                   + (this.paperworkBreakdown.debitCard ? this.paperworkBreakdown.debitCard : 0) 
  }

  calculateInsideSalesBreakdown(){
    this.paperworkBreakdown.totalInsideSalesBreakdown = (this.paperworkBreakdown.totalCreditDebitCard ? this.paperworkBreakdown.totalCreditDebitCard : 0)
                              + (this.paperworkBreakdown.ebt ? this.paperworkBreakdown.ebt : 0)
                              + (this.paperworkBreakdown.expense ? this.paperworkBreakdown.expense : 0)
                              + (this.paperworkBreakdown.officeExpense ? this.paperworkBreakdown.officeExpense : 0)
                              + (this.paperworkBreakdown.trustFund ? this.paperworkBreakdown.trustFund : 0)
                              + (this.paperworkBreakdown.houseAc ? this.paperworkBreakdown.houseAc :0 )
                              + (this.paperworkBreakdown.storeDeposit ? this.paperworkBreakdown.storeDeposit : 0);
  }

  calculateCashPurchase(){
      this.paperworkBreakdown.totalCashPurchase = this.items.value.reduce((sum, item) => sum + item.cashPurchaseAmount, 0);
  }

  calculateTotalInsideSales(){
    this.paperworkBreakdown.totalInsideSales = this.paperworkBreakdown.totalInsideSalesBreakdown + this.paperworkBreakdown.totalCashPurchase;
  }

  calculateOverShort(){
    this.paperworkBreakdown.cashOverShort = this.paperworkBreakdown.totalInsideSales - this.paperworkBreakdown.totalSalesRecord;
    if(this.paperworkBreakdown.totalSalesRecord > this.paperworkBreakdown.totalInsideSales) {
      this.isShort = true;
    }else{
      this.isShort = false;
    }
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
    this.paperworkBreakdown.paperworkDate = args?.value;
  }

  getPaperworkInfoWithBreakdown() {
    this.allModulesService.findById(this.paperworkId,"v1/paperwork/find").subscribe((data: any) => {
      this.paperworkObj = data?.data;
      this.setCalendar();
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  customDates(args: any): void {
    if (args.date.getDay() === 0 || args.date.getDay() === 6 ) {
        // To highlight the week end of every month
        args.element.classList.add('e-highlightweekend');
    }
  }

  rerender(): void {
  }

  get items(){
    return this.addPaperworkBreakdownForm.get('items') as FormArray;
  }

  deleteItem(index: number){
    const amount = this.items.value[index].cashPurchaseAmount;
    this.paperworkBreakdown.totalCashPurchase = this.paperworkBreakdown.totalCashPurchase - amount;
    this.items.removeAt(index);
  }

  addItems(){
    this.items.push(
      this.formBuilder.group({
        id: [''],
        itemName: [''],
        cashPurchaseAmount: [''],
      })
    )
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
