import { Pipe, PipeTransform } from '@angular/core';
import { ContactInterface } from '../interfaces/contact-interface';

@Pipe({
  name: 'dashboardContacts',
  standalone: true,
})
export class DashboardContactPipe implements PipeTransform {
  transform(contacts: ContactInterface[]): number {
    return contacts.length;
  }
}
