import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  
  transform(value: any, ...args: any[]): any {
    let myDate = value
    let changeFormat = myDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    return new DatePipe('en-US').transform(changeFormat, 'MMM d, y');
  }

}
