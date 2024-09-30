import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContactsTable } from '../../../interfaces/contactsTable';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  contactsData: ContactsTable[] = [
    {
      checked: false,
      status: 'active',
      name: 'Hydrogen',
      role: 'Dj',
      tel: '0151319023',
      email: 'mike.schauber@gmx.de',
    },
  ];
  allChecked: boolean = false;
  newContact: ContactsTable = {
    checked: false,
    status: 'active',
    name: '',
    role: '',
    tel: '',
    email: '',
  };

  constructor() {}

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
    console.log(this.contactsData);
  }

  keyboardAddContact($event: KeyboardEvent) {
    console.log($event.keyCode);
    if ($event.keyCode === 13 && this.newContact.name.length !== 0) {
      this.contactsData.push({
        checked: false,
        name: this.newContact.name,
        status: this.newContact.status,
        role: this.newContact.role,
        tel: this.newContact.tel,
        email: this.newContact.email,
      });
      this.clearNewContactValues();
    }
  }

  mouseAddContact() {
    if (this.newContact.name.length > 1) {
      this.contactsData.push({
        checked: false,
        name: this.newContact.name,
        status: this.newContact.status,
        role: this.newContact.role,
        tel: this.newContact.tel,
        email: this.newContact.email,
      });
      this.clearNewContactValues();
    }
  }

  clearNewContactValues() {
    this.newContact = {
      checked: false,
      status: 'active',
      name: '',
      role: '',
      tel: '',
      email: '',
    };
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
