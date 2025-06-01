import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipeArrayPipe } from './filter-pipe-array.pipe';



@NgModule({
  declarations: [
    FilterPipeArrayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterPipeArrayPipe
  ]
})
export class SharedModule { }
