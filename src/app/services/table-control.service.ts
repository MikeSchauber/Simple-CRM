import { Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';

@Injectable({
  providedIn: 'root',
})
export class TableControlService {
  allChecked: boolean = false;
  newContact: string = '';

  constructor(private contactsData: ContactsService) {}

  checkAllContacts(status: string) {
    status == 'active' ? this.checkAllActives() : this.checkAllInactives();
  }

  checkAllActives() {
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

  checkAllInactives() {
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

  keyboardAddContact($event: KeyboardEvent, status: string) {
    if ($event.keyCode === 13 && this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      status == 'active'
        ? this.contactsData.activeContacts.push(user)
        : this.contactsData.inactiveContacts.push(user);
      this.clearAllInputs();
      console.log(this.contactsData.activeContacts);
    }
  }

  mouseAddContact(status: string) {
    if (this.newContact.length != 0) {
      let user = new Contact(this.newContact);
      status == 'active'
        ? this.contactsData.activeContacts.push(user)
        : this.contactsData.inactiveContacts.push(user);
      this.clearAllInputs();
    }
  }

  clearAllInputs() {
    this.newContact = '';
    this.allChecked = false;
  }

  deleteContacts(status: string) {
    status == 'active'
      ? this.handleActiveContacts()
      : this.handleInactiveContacts();
  }

  handleActiveContacts() {
    for (let i = 0; i < this.contactsData.activeContacts.length; i++) {
      const contact = this.contactsData.activeContacts[i];
      if (contact.checked === true) {
        this.contactsData.activeContacts.splice(i, 1);
        i--;
      }
    }
  }

  handleInactiveContacts() {
    for (let i = 0; i < this.contactsData.inactiveContacts.length; i++) {
      const contact = this.contactsData.inactiveContacts[i];
      if (contact.checked === true) {
        this.contactsData.inactiveContacts.splice(i, 1);
        i--;
      }
    }
  }

  addColumn(type: string, status: string) {
    let newColumn: Column;
    if (type == 'note') {
      newColumn = new Column(this.contactsData.availableColumnTypes.note);
    } else if (type == 'type') {
      newColumn = this.contactsData.availableColumnTypes.type;
    } else if (type == 'status') {
      newColumn = this.contactsData.availableColumnTypes.status;
    } else {
      newColumn = this.contactsData.availableColumnTypes.priority;
    }
    this.handleNewColumn(newColumn, status);
    console.log(newColumn);
    

  }

  handleNewColumn(newColumn: Column , status: string) {
    this.contactsData.activeTableColumns.push(newColumn);
    this.contactsData.activeContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
    });
  }

  buildNoteColumn() {
    return 
  }
}
