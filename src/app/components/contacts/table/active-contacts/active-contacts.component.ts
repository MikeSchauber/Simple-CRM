import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Contact } from '../../../../models/contact.class';

@Component({
  selector: 'app-active-contacts',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './active-contacts.component.html',
  styleUrl: './active-contacts.component.scss',
})
export class ActiveContactsComponent {
  emailHovered: boolean = false;
  phoneHovered: boolean = false;
  allChecked: boolean = false;
  newContact: string = '';

  availableColumnTypes = {
    note: {
      name: 'Note',
      typ: 'text',
      availableDropdowns: [{}],
    },
    type: {
      name: 'Type',
      typ: 'dropdown',
      availableDropdowns: [
        { name: 'Artist', color: '#ff5722' },
        { name: 'Manager', color: '#2196f3' },
        { name: 'Lead', color: '#4caf50' },
        { name: 'Partner', color: '#9c27b0' },
        { name: 'Customer', color: '#ffeb3b' },
      ],
    },
    status: {
      name: 'Status',
      typ: 'dropdown',
      availableDropdowns: [
        { name: 'active', color: '#4caf50' },
        { name: 'inactive', color: '#f44336' },
        { name: 'suspended', color: '#ff9800' },
      ],
    },
    priority: {
      name: 'Priority',
      typ: 'dropdown',
      availableDropdowns: [
        { name: 'low', color: '#8bc34a' },
        { name: 'medium', color: '#ffc107' },
        { name: 'high', color: '#f44336' },
      ],
    },
  };

  tableData = [
    {
      class: 'contacts-cell',
      name: 'Contacts',
      typ: 'text',
      availableDropdowns: [{}],
    },
    {
      name: 'Tel.',
      typ: 'href',
      availableDropdowns: [{}],
    },
    {
      name: 'Email',
      typ: 'href',
      availableDropdowns: [{}],
    },
  ];

  contactsData = [
    {
      checked: false,
      status: 'active',
      name: 'Astral',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
      newColumns: [
        {
          name: '',
          typ: '',
          availableDropdowns: [{}],
        },
      ],
    },
  ];

  constructor() {}

  hoverAction(action: string) {
    if (action == 'email') {
      this.emailHovered = true;
    } else if (action == 'tel') {
      this.phoneHovered = true;
    }
  }

  mouseOutAction() {
    this.emailHovered = false;
    this.phoneHovered = false;
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

  keyboardAddContact($event: KeyboardEvent) {
    if ($event.keyCode === 13 && this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      this.contactsData.push(user);
      this.clearAllInputs();
      console.log(this.contactsData);
    }
  }

  mouseAddContact() {
    if (this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      this.contactsData.push(user);
      this.clearAllInputs();
    }
  }

  deleteContacts() {
    for (let i = 0; i < this.contactsData.length; i++) {
      const contact = this.contactsData[i];
      if (contact.checked === true) {
        this.contactsData.splice(i, 1);
        i--;
      }
    }
  }

  clearAllInputs() {
    this.newContact = '';
    this.allChecked = false;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  addColumn(type: string) {
    let newColumn;
    if (type == 'note') {
      newColumn = this.availableColumnTypes.note;
    } else if (type == 'type') {
      newColumn = this.availableColumnTypes.type;
    } else if (type == 'status') {
      newColumn = this.availableColumnTypes.status;
    } else {
      newColumn = this.availableColumnTypes.priority;
    }
    this.tableData.push(newColumn);
    this.contactsData.forEach((contact) => {
      contact.newColumns.push(newColumn);
      console.log(contact.newColumns);
      console.log(newColumn.name);
    });
  }
}
