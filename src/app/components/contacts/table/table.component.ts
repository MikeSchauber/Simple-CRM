import { Component } from '@angular/core';
import { ActiveContactsComponent } from './active-contacts/active-contacts.component';
import { InactiveContactsComponent } from './inactive-contacts/inactive-contacts.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ActiveContactsComponent, InactiveContactsComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {}
