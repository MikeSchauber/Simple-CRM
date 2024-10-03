import { Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';

@Injectable({
  providedIn: 'root',
})
export class TableControlService {
  allCheckedActive: boolean = false;
  allCheckedInactive: boolean = false;
  emailDialog: boolean = false;
  dialogPositionX: string = '';
  dialogPositionY: string = '';
  newContact: string = '';

  constructor(private contactsData: ContactsService) {}

  preventDefault($event: MouseEvent) {
    $event.stopPropagation();
  }

  checkAllContacts(status: string) {
    status == 'active' ? this.checkAllActives() : this.checkAllInactives();
  }

  checkAllActives() {
    if (!this.allCheckedActive) {
      this.allCheckedActive = true;
      this.contactsData.activeContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allCheckedActive = false;
      this.contactsData.activeContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  checkAllInactives() {
    if (!this.allCheckedInactive) {
      this.allCheckedInactive = true;
      this.contactsData.inactiveContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allCheckedInactive = false;
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
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
  }

  deleteContacts(status: string) {
    status == 'active'
      ? this.handleActiveContacts()
      : this.handleInactiveContacts();
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
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
      newColumn = new Column(this.contactsData.availableColumnTypes.type);
    } else if (type == 'status') {
      newColumn = new Column(this.contactsData.availableColumnTypes.status);
    } else {
      newColumn = new Column(this.contactsData.availableColumnTypes.priority);
    }
    status == 'active'
      ? this.pushIntoActiveContacts(newColumn)
      : this.pushIntoInactiveContacts(newColumn);
  }

  pushIntoActiveContacts(newColumn: Column) {
    this.contactsData.activeTableColumns.push(newColumn);
    this.contactsData.activeContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
    });
  }

  pushIntoInactiveContacts(newColumn: Column) {
    this.contactsData.inactiveTableColumns.push(newColumn);
    this.contactsData.inactiveContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
    });
  }

  deleteEmail(i: number, status: string) {
    this.contactsData.activeContacts[i].email = '';
  }

  openEmailDialog($event: MouseEvent) {
    this.dialogPositionY = $event.clientY.toString();
    this.emailDialog = true;
  }

  closeEmailDialog() {
    this.emailDialog = false;
  }
}
