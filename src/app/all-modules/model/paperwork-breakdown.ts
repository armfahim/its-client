export class PaperworkBreakdown {
    id!:number;

    paperworkDate!:Date;

    //Sales Record(Incoming)
    merchantSale!:number;
    salesTax!:number;
    insideSales!:number;
    totalSalesRecord!:number;

    //Inside Sales Breakdown
    creditCard!:number;
    debitCard!:number;
    totalCreditDebitCard!:number;
    ebt!:number;
    expense!:number;
    officeExpense!:number;
    trustFund!:number;
    houseAc!:number;
    storeDeposit!:number;
    total!:number; // totalCreditDebitCard + ebt + expense + officeExpense + trustFund + houseAc + storeDeposit
}
