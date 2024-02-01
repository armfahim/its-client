import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  id!: number;
  invoice:any;

  constructor(
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
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

}
