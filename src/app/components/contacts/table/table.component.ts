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
    role: {
      name: 'Typ',
      typ: 'dropdown',
      availableDropdowns: ['Artist', 'Manager', 'Lead', 'Partner', 'Customer'],
    },
    textfield: {
      name: "Text",
      typ: "text",
      value: '',
    },
    status: {
      name: 'Status',
      typ: 'dropdown',
      availableDropdowns: ['active', 'inactive', 'suspended'],
    },
    priority: {
      name: "Priority",
      typ: "dropdown",
      availableDropdowns: ['low', 'medium', 'high'],
    }
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
          column: 'New Column 1',
          position: 0,
          class: 'new-column-1-headcell',
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
          column: 'New Column 1',
          position: 0,
          class: 'new-column-1-headcell',
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
    newColumns: [],
  };

  constructor() {}

  hoverAction(action: string) {
    if (action == "email") {
      this.emailHovered = true;
    } else if (action == "tel") {
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
    console.log(this.contactsData);
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
      newColumns: [],
    };
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  addNewColumn() {
    this.tableData.push({
      column: 'New Column',
      class: 'new-column-cell',
    });
    console.log(this.tableData);
    this.contactsData.forEach((contact, index) => {
      contact.newColumns.push({
        column: 'New Column 1',
        position: 0,
        class: 'new-column-1-headcell',
      });
      console.log(contact);
    });
  }
}
