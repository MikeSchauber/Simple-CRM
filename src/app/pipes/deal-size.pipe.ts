import { Pipe, PipeTransform } from '@angular/core';
import { DealInterface } from '../interfaces/deal-interface';

@Pipe({
  name: 'dealSize',
  standalone: true,
})
export class DealSizePipe implements PipeTransform {
  transform(deals: DealInterface[]): string {
    let sum: number = 0;
    for (let i = 0; i < deals.length; i++) {
      const deal = deals[i];
      sum += deal.dealValue;
    }
    let sumLength = sum.toString().length;
    if (sumLength >= 6) {
      let string = sum.toString().slice(0, 3) + 'K';
      return string;
    } else if (sumLength == 5) {
      let string = sum.toString().slice(0, 2) + 'K';
      return string;
    } else if (sumLength == 4) {
      let string = sum.toString().slice(0, 1) + 'K';
      return string;
    } else {
      return sum.toString();
    }
  }
}
