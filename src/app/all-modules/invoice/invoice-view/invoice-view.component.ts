import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../services/invoice.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  id!: number;
  invoice:any;
  dataLocalUrl:any;

  constructor(
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private invoiceService: InvoiceService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.viewById();
  }
  viewById() {
    this.allModulesService.findById(this.id,"v1/invoice-details/find-view").subscribe((data: any) => {
      console.log(data);
      this.invoice = data?.data;
      console.log(this.invoice);
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  loadPdf() {
    let queryParams: any = {};
    queryParams.invoiceId = this.id;

    this.invoiceService.getInvoiceDetailsPdf("/v1/report/invoice-details",queryParams).subscribe((response:any)=>{
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
     // window.open(fileURL);
      this.dataLocalUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(fileURL);
        $('body').css('height', '100%');
        $('.main-wrapper').css('height', '100%');
        $('.main-wrapper .page-wrapper').css('height', '100%');
    });
  }

  cancelPrintPdf(){
    this.dataLocalUrl = undefined;
  }

}
