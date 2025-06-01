import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipeArray'
})
export class FilterPipeArrayPipe implements PipeTransform {

  transform(items: any[], field: string[], value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter(singleItem => {
      // if (singleItem[field]) {
       return field.some(field =>
          singleItem[field]?.toString().toLowerCase().includes(value.toString().toLowerCase())
        )
        // return singleItem[field].toString().toLowerCase().includes(value.toString().toLowerCase());
      // }
    });
  }

}
