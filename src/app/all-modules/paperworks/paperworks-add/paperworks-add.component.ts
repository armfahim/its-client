import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';
import { PaperworksService } from '../../services/paperworks.service';

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
  sharedPaperworkObj: any;

  constructor(private formBuilder: FormBuilder,
    private paperworksService: PaperworksService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.paperworksService.currentPaperwork.subscribe(obj => this.sharedPaperworkObj = obj);



    this.addPaperworkForm = this.formBuilder.group({
      paperworkDate: ["", [Validators.required]],
      items: this.formBuilder.array([]),
    })
    this.addItem();
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
