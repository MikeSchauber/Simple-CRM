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
      name: 'Hydrogen',
      role: 'Dj',
      tel: '0151319023',
      email: 'mike.schauber@gmx.de',
    }
  ];
  displayedColumns: string[] = ['checked', 'name', 'role', 'telefon'];
  allChecked: boolean = false;
  newContact: ContactsTable = {
    checked: false,
    name: '',
    role: '',
    tel: '',
    email: '',
  }

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
  }

  addContact($event: KeyboardEvent) {
    console.log($event.keyCode);
    if ($event.keyCode === 13) {
      this.contactsData.push(
        {
          checked: false,
          name: this.newContact.name,
          role: this.newContact.role,
          tel: this.newContact.tel,
          email: this.newContact.email,
        }
      );	
    }
    
  }
}
