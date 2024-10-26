import { Pipe, PipeTransform } from '@angular/core';
import { DealInterface } from '../interfaces/deal-interface';

@Pipe({
  name: 'dealsCheck',
  standalone: true
})
export class DealsCheckPipe implements PipeTransform {

  transform(deals: DealInterface[]): number {
    let dealsCheck: DealInterface[] = [];
    dealsCheck = deals.filter((d) => d.phaseBadge.name == 'Check');
    return dealsCheck.length;
  }

}
