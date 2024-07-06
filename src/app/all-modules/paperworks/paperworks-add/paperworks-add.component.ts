import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-paperworks-add',
  templateUrl: './paperworks-add.component.html',
  styleUrls: ['./paperworks-add.component.css']
})
export class PaperworksAddComponent implements OnInit {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  public addPaperworkForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addPaperworkForm = this.formBuilder.group({
      paperworkDate: ["", [Validators.required]],
      items: this.formBuilder.array([]),
      // itemName: ["", []],
      // cashPurchaseAmount: ["", []],
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

}
