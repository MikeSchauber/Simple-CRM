import { Pipe, PipeTransform } from '@angular/core';
import { DealInterface } from '../interfaces/deal-interface';

@Pipe({
  name: 'dealWon',
  standalone: true,
})
export class DealWonPipe implements PipeTransform {
  transform(deals: DealInterface[]): number {
    let dealsWon: DealInterface[] = [];

    dealsWon = deals.filter((d) => d.phaseBadge.name == 'Won');

    return dealsWon.length;
  }
}
