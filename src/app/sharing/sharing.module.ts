import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from 'src/assets/pipes/custom-date.pipe';



@NgModule({
  declarations: [CustomDatePipe],
  exports: [
    CustomDatePipe,
  ],
  imports: [
    CommonModule
  ]
})
export class SharingModule { }
