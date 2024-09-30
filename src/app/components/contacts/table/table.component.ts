import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContactsTable } from '../../../interfaces/contactsTable';

import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, FormsModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  contactsData: ContactsTable[] = [
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
    { checked: false, name: 'Hydrogen', role: 'Dj', tel: '0151319023' },
  ];
  displayedColumns: string[] = ['checked', 'name', 'role', 'telefon'];
  allChecked: boolean = false;

  constructor() {

  }

  checkAllContacts() {
    if (!this.allChecked) {
      this.allChecked = true;
      this.contactsData.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allChecked = false;
      this.contactsData.forEach((e) => {
        e.checked = false;
      });
    }
  }
}
