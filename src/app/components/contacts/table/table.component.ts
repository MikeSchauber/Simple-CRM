import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';

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
  emailHovered: boolean = false;
  phoneHovered: boolean = false;

  availableColumnTypes = {
    textfield: {
      name: 'Note',
      typ: 'text',
      value: '',
    },
    role: {
      name: 'Typ',
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
      column: 'Contacts',
      class: 'contacts-headcell',
    },
    {
      column: 'Phone',
      class: 'phone-headcell',
    },
    {
      column: 'Email',
      class: 'email-headcell',
    },
  ];

  contactsData = [
    {
      checked: false,
      status: 'active',
      name: 'Hydrogen',
      tel: '0151319023',
      email: 'mike.schauber@gmx.de',
      newColumns: [
        {
          name: 'Spacer',
        },
      ],
    },
    {
      checked: false,
      status: 'active',
      name: 'Astral',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
      newColumns: [
        {
          name: 'Spacer',
        },
      ],
    },
  ];
  allChecked: boolean = false;
  newContact = {
    checked: false,
    status: 'active',
    name: '',
    tel: '',
    email: '',
    newColumns: [
      {
        name: 'Spacer',
      },
    ],
  };

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
    if ($event.keyCode === 13 && this.newContact.name.length != 0) {
      this.contactsData.push({
        checked: false,
        name: this.newContact.name,
        status: this.newContact.status,
        tel: this.newContact.tel,
        email: this.newContact.email,
        newColumns: this.newContact.newColumns,
      });
      this.clearNewContactValues();
    }
  }

  mouseAddContact() {
    if (this.newContact.name.length != 0) {
      this.contactsData.push({
        checked: false,
        name: this.newContact.name,
        status: this.newContact.status,
        tel: this.newContact.tel,
        email: this.newContact.email,
        newColumns: this.newContact.newColumns,
      });
      this.clearNewContactValues();
    }
  }

  clearNewContactValues() {
    this.newContact = {
      checked: false,
      status: 'active',
      name: '',
      tel: '',
      email: '',
      newColumns: [
        {
          name: 'Spacer',
        },
      ],
    };
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  openColumnMenu() {}
}
