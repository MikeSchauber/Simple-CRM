import { Pipe, PipeTransform } from '@angular/core';
import { DealInterface } from '../interfaces/deal-interface';

@Pipe({
  name: 'upcomingDeal',
  standalone: true,
})
export class UpcomingDealPipe implements PipeTransform {
  transform(deals: DealInterface[]): number {
    let daysUntilDeal: number[] = [];
    let today = new Date();
    deals.forEach((deal) => {
      const diffInTime = deal.dateAsTimestamp - today.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      daysUntilDeal.push(diffInDays);
    });
    let upcomingDeals = daysUntilDeal.filter((d) => d <= 7 && d >= 0);
    return upcomingDeals.length;
  }
}
