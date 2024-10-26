import { Pipe, PipeTransform } from '@angular/core';
import { DealInterface } from '../interfaces/deal-interface';

@Pipe({
  name: 'dealSize',
  standalone: true,
})
export class DealSizePipe implements PipeTransform {
  transform(deals: DealInterface[]): string {
    let sum: number = deals.reduce((acc, deal) => acc + deal.dealValue, 0);
    const units = [
      { threshold: 1e9, suffix: 'B' },
      { threshold: 1e6, suffix: 'M' },
      { threshold: 1e3, suffix: 'K' },
    ];
    for (const unit of units) {
      if (sum >= unit.threshold) {
        let value = (sum / unit.threshold).toFixed(1);
        return value.length > 4
          ? value.slice(0, 3) + unit.suffix
          : value + unit.suffix;
      }
    }
    return sum.toString();
  }
}
