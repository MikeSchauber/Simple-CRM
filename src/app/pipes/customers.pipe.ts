import { Pipe, PipeTransform } from '@angular/core';
import { ContactInterface } from '../interfaces/contact-interface';

@Pipe({
  name: 'customers',
  standalone: true,
})
export class CustomersPipe implements PipeTransform {
  transform(contacts: ContactInterface[]): number {
    let customers: ContactInterface[] = [];
    customers = contacts.filter((c) => c.roleBadge.name == 'Customer');
    return customers.length;
  }
}
