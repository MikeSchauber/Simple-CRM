import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  hovered: boolean = false;
  tableData = [
    {
      column: 'Contacts',
      position: 0,
      class: 'contacts-headcell',
    },
    {
      column: 'Typ',
      position: 1,
      class: 'typ-headcell',
    },
    {
      column: 'Phone',
      position: 2,
      class: 'phone-headcell',
    },
    {
      column: 'Email',
      position: 3,
      class: 'email-headcell',
    },
  ];

  contactsData = [
    {
      checked: false,
      status: 'active',
      name: 'Hydrogen',
      role: 'Dj',
      tel: '0151319023',
      email: 'mike.schauber@gmx.de',
    },
    {
      checked: false,
      status: 'active',
      name: 'Astral',
      role: 'Live Act',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
    },
  ];
  allChecked: boolean = false;
  newContact = {
    checked: false,
    status: 'active',
    name: '',
    role: '',
    tel: '',
    email: '',
  };

  constructor() {}

  hoverAction() {
    this.hovered = true;
  }

  mouseOutAction() {
    this.hovered = false;
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
    console.log(this.contactsData);
  }

  keyboardAddContact($event: KeyboardEvent) {
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

  addNewColumn() {
    this.tableData.push({
      column: 'New Column',
      position: this.tableData.length,
      class: 'new-column-cell',
    });
    console.log(this.tableData);
  }
}
