import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Contact } from '../../../../models/contact.class';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-inactive-contacts',
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
  templateUrl: './inactive-contacts.component.html',
  styleUrl: './inactive-contacts.component.scss',
})
export class InactiveContactsComponent {
  emailHovered: boolean = false;
  phoneHovered: boolean = false;
  allChecked: boolean = false;
  newContact: string = '';

  constructor(public contactsData: ContactsService) {

  }

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
      this.contactsData.inactiveContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allChecked = false;
      this.contactsData.inactiveContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  keyboardAddContact($event: KeyboardEvent) {
    if ($event.keyCode === 13 && this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      this.contactsData.inactiveContacts.push(user);
      this.clearAllInputs();
      console.log(this.contactsData.inactiveContacts);
    }
  }

  mouseAddContact() {
    if (this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      this.contactsData.inactiveContacts.push(user);
      this.clearAllInputs();
    }
  }

  deleteContacts() {
    for (let i = 0; i < this.contactsData.inactiveContacts.length; i++) {
      const contact = this.contactsData.inactiveContacts[i];
      if (contact.checked === true) {
        this.contactsData.inactiveContacts.splice(i, 1);
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
      newColumn = this.contactsData.availableColumnTypes.note;
    } else if (type == 'type') {
      newColumn = this.contactsData.availableColumnTypes.type;
    } else if (type == 'status') {
      newColumn = this.contactsData.availableColumnTypes.status;
    } else {
      newColumn = this.contactsData.availableColumnTypes.priority;
    }
    this.contactsData.inactiveTableColumns.push(newColumn);
    this.contactsData.inactiveContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
      console.log(contact.newColumns);
      console.log(newColumn.name);
    });
  }
}
