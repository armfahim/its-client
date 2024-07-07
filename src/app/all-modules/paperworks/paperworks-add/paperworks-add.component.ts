import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';
import { PaperworksService } from '../../services/paperworks.service';
import { ActivatedRoute } from '@angular/router';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paperworks-add',
  templateUrl: './paperworks-add.component.html',
  styleUrls: ['./paperworks-add.component.css']
})
export class PaperworksAddComponent implements OnInit, OnDestroy  {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  public addPaperworkForm: FormGroup;
  subscription: Subscription;
  // sharedPaperworkObj: any;

  paperworkId!: number;
  paperworkObj:any;

  //Days List
  first10 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  second10 = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
  third10 = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

  constructor(private formBuilder: FormBuilder,
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

    this.addPaperworkForm = this.formBuilder.group({
      paperworkDate: ["", [Validators.required]],
      items: this.formBuilder.array([]),
    })
    this.addItem();
  }

  getPaperworkInfoWithBreakdown() {
    this.allModulesService.findById(this.paperworkId,"v1/paperwork/find").subscribe((data: any) => {
      this.paperworkObj = data?.data;
    }, (error) => {
      this.toastr.error(error.error.message);
    });
  }

  get items(){
    return this.addPaperworkForm.get('items') as FormArray;
  }

  deleteItem(index: number){
    this.items.removeAt(index);
  }

  addItem(){
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
