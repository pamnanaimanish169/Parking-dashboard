import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(value) {
    let date = new Date(value.toString()).toISOString().slice(0,10);
    return date;
  }

}
