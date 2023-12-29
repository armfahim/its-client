export class Invoice {
  id!:number;

  supplierDetails!:number;
  invoiceNumber!:string;
  invoiceDate!:Date;
  invoiceAmount!:number;
  term!:string;
  creditAmount!:number;
  netDue!:number;
  paymentDueDate!:string;
  chequeNumber!:string;
  paidDate!:string;
  invoiceDesc!:string;
  isPaid:boolean;

}
