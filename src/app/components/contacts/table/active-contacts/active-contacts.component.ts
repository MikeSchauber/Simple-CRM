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

 



  constructor(public contactsData: ContactsService) {}

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
      this.contactsData.activeContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allChecked = false;
      this.contactsData.activeContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  keyboardAddContact($event: KeyboardEvent) {
    if ($event.keyCode === 13 && this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      this.contactsData.activeContacts.push(user);
      this.clearAllInputs();
      console.log(this.contactsData.activeContacts);
    }
  }

  mouseAddContact() {
    if (this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      this.contactsData.activeContacts.push(user);
      this.clearAllInputs();
    }
  }

  deleteContacts() {
    for (let i = 0; i < this.contactsData.activeContacts.length; i++) {
      const contact = this.contactsData.activeContacts[i];
      if (contact.checked === true) {
        this.contactsData.activeContacts.splice(i, 1);
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
    this.contactsData.activeTableColumns.push(newColumn);
    this.contactsData.activeContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
      console.log(contact.newColumns);
      console.log(newColumn.name);
    });
  }
}
