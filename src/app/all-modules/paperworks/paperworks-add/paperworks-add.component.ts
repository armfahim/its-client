import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaperworksService } from '../../services/paperworks.service';
import { ActivatedRoute } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { PaperworkBreakdown } from '../../model/paperwork-breakdown';
import { DatePipe } from '@angular/common';
import { Paperworks } from '../../model/paperworks';

@Component({
  selector: 'app-paperworks-add',
  templateUrl: './paperworks-add.component.html',
  styleUrls: ['./paperworks-add.component.css']
})
export class PaperworksAddComponent implements OnInit {

  viewDate: Date = new Date();

  public addPaperworkBreakdownForm: FormGroup;

  paperworkId!: number;

  minDate:any;
  maxDate:any;
  dateValues: Date[] = [];
  dateValue: any;
  isShort : boolean = false;
  
  //Model
  paperworkBreakdown: PaperworkBreakdown = new PaperworkBreakdown();
  paperworkObj:Paperworks = new Paperworks();
  loading = false;
  isAdd = true;

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

  //Add new breakdown
  public onAdd() {
    this.loading = true;
    this.paperworkBreakdown.cashPurchaseList = this.items.value;
    this.paperworkBreakdown.paperworksId = this.paperworkObj.id;

    if(!this.customValidation()) return;
    this.formatDateString();

    this.allModulesService.add(this.paperworkBreakdown, "/v1/paperwork/breakdown/save").subscribe((data) => {
      if(data.status == "error") {
          this.toastr.error(data.errors,"Failed");
          this.loading = false;
          return;
        }
        this.loading = false;
        this.toastr.success("Data has been saved sucessfully!", "Success",{ timeOut: 5000 });
      },
      (error) => {
        this.loading = false;
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.warning(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

  public onUpdate(){
    this.loading = true;
    this.paperworkBreakdown.cashPurchaseList = this.items.value;
    this.paperworkBreakdown.paperworksId = this.paperworkObj.id;

    if(!this.customValidation()) return;
    this.formatDateString();

    this.allModulesService.update(this.paperworkBreakdown, "/v1/paperwork/breakdown/update").subscribe((data) => {
      if(data.status == "error") {
          this.toastr.error(data.errors,"Failed");
          this.loading = false;
          return;
        }
        this.loading = false;
        this.toastr.success("Data has been updated sucessfully!", "Success",{ timeOut: 5000 });
      },
      (error) => {
        this.loading = false;
        console.error("API Error:", error);
        // Extract error message from the API response
        const customErrorMessage = error && error.error && error.error.errors ? error.error.errors.toString(): "Unknown error";
        this.toastr.warning(customErrorMessage, "Failed",{ timeOut: 5000 });
        return;
      });
  }

  formatDateString() {
    var datePipe = new DatePipe('en-US');
    // Get the formatted date string
    const formattedDateString = datePipe.transform(this.paperworkBreakdown.paperworkDate, 'yyyy-MM-dd');

    // Convert the formatted date string back to a Date object
    if (formattedDateString) {
      this.paperworkBreakdown.paperworkDate =  new Date(formattedDateString);
    }
  }

  customValidation(): boolean{
    if(this.paperworkBreakdown.paperworkDate == null){
      this.toastr.error("Select a date","",{ timeOut: 3000 });
      this.loading = false;
      this.addPaperworkBreakdownForm.get('paperworkDate').markAsTouched();
      this.addPaperworkBreakdownForm.get('paperworkDate').setErrors({ 'invalid': true });
      return false;
    }
    if(this.paperworkBreakdown.merchantSale == null){
      this.toastr.error("Merchant sale is required","",{ timeOut: 3000 });
      this.addPaperworkBreakdownForm.get('merchantSale').markAsTouched();
      this.addPaperworkBreakdownForm.get('merchantSale').setErrors({ 'invalid': true });
      this.loading = false;
      return false;
    }
    if(this.paperworkBreakdown.insideSales == null){
      this.toastr.error("Inside sales is required","",{ timeOut: 3000 });
      this.loading = false;
      this.addPaperworkBreakdownForm.get('insideSales').markAsTouched();
      this.addPaperworkBreakdownForm.get('insideSales').setErrors({ 'invalid': true });
      return false;
    }
    return true;
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
    this.pushToDateValues();
  }

  pushToDateValues() {
    this.dateValues = this.dateValues || []; // Initialize the array if null
    this.dateValues.push(this.paperworkBreakdown.paperworkDate); // Push the current paperwork date to date values
    if(this.dateValues){
      this.dateValues = this.dateValues.map(dateString => new Date(dateString)); // convert to Date()
    }
    this.dateValue = new Date(this.paperworkBreakdown.paperworkDate);
  }

  onChangePaperworkDate(event: any){
    this.paperworkBreakdown.paperworkDate = event;
    if(this.paperworkBreakdown.paperworkDate){
      this.pushToDateValues();
      this.findPaperworkBreakdownByDate();
    }
  }

  onChange(args: any) {
    this.paperworkBreakdown.paperworkDate = args?.value;
    // if(this.paperworkBreakdown.paperworkDate){
    //   this.findPaperworkBreakdownByDate();
    // }
  }

  getPaperworkInfoWithBreakdown() {
    this.allModulesService.findById(this.paperworkId,"v1/paperwork/find/details").subscribe((data: any) => {
      this.paperworkObj = data?.data;
      this.paperworkBreakdown.paperworkDate = data?.data.newInputDate;
      this.dateValues = data?.data.existsPaperworkBreakDownDates;
      this.setCalendar();
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  findPaperworkBreakdownByDate() {
    var datePipe = new DatePipe('en-US');
    // Get the formatted date string
    const formattedDateString = datePipe.transform(this.paperworkBreakdown.paperworkDate, 'yyyy-MM-dd');
    
    let request = {
      paperworksId : this.paperworkId,
      paperworkBreakdownDate: formattedDateString,
    }
    this.allModulesService.getPaperworkBreakdownData(request,"/v1/paperwork/breakdown/find/paperwork-breakdown-date").subscribe((data: any) => {
      this.paperworkBreakdown = data?.data;
      this.clearItems();
      if(!this.paperworkBreakdown.id){
         this.addItems();
      }else this.isAdd = false;
      if(this.paperworkBreakdown?.cashPurchaseList?.length > 0){
        this.pushCashPurchaseListToItems();
      }
    },
    (error) => {
      return;
    });
  }

  pushCashPurchaseListToItems() {
    this.paperworkBreakdown.cashPurchaseList.forEach(purchase => {
      this.items.push(this.createItem(purchase));
    })
  }

  clearItems(): void {
    while (this.items.length !== 0) {
      this.items.removeAt(0);
    }
  }

  createItem(purchase): FormGroup {
    return this.formBuilder.group({
      id: [purchase?.id],
      itemName: [purchase?.itemName],
      cashPurchaseAmount: [purchase?.cashPurchaseAmount]
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

  convertTDate(formattedDateString: string) {
    const dateParts = formattedDateString.split('-'); // Split the string into parts
    const year = parseInt(dateParts[0], 10); // Parse year as integer
    const month = parseInt(dateParts[1], 10) - 1; // Parse month (zero-based index)
    const day = parseInt(dateParts[2], 10); // Parse day as integer
    
    return new Date(year, month, day); // Create new Date object
  }

}
