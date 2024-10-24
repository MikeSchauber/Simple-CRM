import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dealStatus',
  standalone: true  
})
export class DealStatusPipe implements PipeTransform {

  transform(deal: any): string {
    const today = new Date();
    const diffInTime = deal.dateAsTimestamp - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    if (diffInDays > 0) {
      if (diffInDays <= 7) {
        return 'red';
      } else if (diffInDays <= 14) {
        return 'yellow';
      } else {
        return 'green';
      }
    } else {
      return 'red';
    }
  }
}
