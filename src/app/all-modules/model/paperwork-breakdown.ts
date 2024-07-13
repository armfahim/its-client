export class PaperworkBreakdown {
    id!:number;

    paperworkDate!:Date;

    //Sales Record(Incoming)
    merchantSale: any;
    salesTax: any = 0;
    insideSales: any;
    totalSalesRecord: any = 0;

    //Inside Sales Breakdown
    creditCard: any;
    debitCard: any;
    totalCreditDebitCard: any;
    ebt: any;
    expense: any;
    officeExpense: any;
    trustFund: any;
    houseAc: any;
    storeDeposit: any;
    totalInsideSalesBreakdown:any = 0;// totalCreditDebitCard + ebt + expense + officeExpense + trustFund + houseAc + storeDeposit
    totalCashPurchase: any = 0;
    totalInsideSales: any = 0; // totalCreditDebitCard + ebt + expense + officeExpense + trustFund + houseAc + storeDeposit + totalCashPurchase
    cashOverShort: any = 0;
    notes: any;

    cashPurchaseList:any;

    paperworksId:any;
}
