import { Component } from '@angular/core';
import { DealsTableComponent } from './deals-table/deals-table.component';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [DealsTableComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})
export class DealsComponent {

}
