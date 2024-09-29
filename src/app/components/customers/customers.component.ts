import { Component } from '@angular/core';
import { CustomerTableComponent } from './customer-table/customer-table.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomerTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
