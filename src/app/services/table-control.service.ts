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
  emailDialogActive: boolean = false;
  telEditActive: boolean = false;
  emailDialogInactive: boolean = false;
  telEditInactive: boolean = false;
  dialogPositionY: string = '';
  newContactActive: string = '';
  newContactInactive: string = '';
  newVisibleMailActive: string = '';
  newVisibleMailInactive: string = '';

  constructor(private contactsData: ContactsService) {}

  preventDefault(event: MouseEvent) {
    event.stopPropagation();
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

  keyboardAddContact(event: KeyboardEvent, status: string) {
    if (
      status == 'active' &&
      event.keyCode === 13 &&
      this.newContactActive.length != 0
    ) {
      let user = new Contact(this.newContactActive);
      this.contactsData.activeContacts.push(user);
      this.clearAllInputs();
    } else if (
      status == 'inactive' &&
      event.keyCode === 13 &&
      this.newContactInactive.length != 0
    ) {
      let user = new Contact(this.newContactInactive);
      this.contactsData.inactiveContacts.push(user);
      this.clearAllInputs();
    }
  }

  mouseAddContact(status: string) {
    if (status == 'active' && this.newContactActive.length != 0) {
      let user = new Contact(this.newContactActive);
      this.contactsData.activeContacts.push(user);
    } else if (status == 'inactive' && this.newContactInactive.length != 0) {
      let user = new Contact(this.newContactInactive);
      this.contactsData.inactiveContacts.push(user);
    }
    this.clearAllInputs();
  }

  clearAllInputs() {
    this.newContactActive = '';
    this.newContactInactive = '';
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

  deleteTel(i: number, status: string) {
    status == 'active'
      ? (this.contactsData.activeContacts[i].tel = '')
      : (this.contactsData.inactiveContacts[i].tel = '');
  }

  openTelInput(status: string) {
    status == 'active'
      ? (this.telEditActive = true)
      : (this.telEditInactive = true);
  }

  saveTelData(event: any, i: number, status: string) {
    if (event.keyCode === 13) {
      status == 'active'
        ? (this.contactsData.activeContacts[i].tel = event.target.value)
        : (this.contactsData.inactiveContacts[i].tel = event.target.value);
    }
  }

  deleteEmail(i: number, status: string) {
    if (status == 'active') {
      this.contactsData.activeContacts[i].email = '';
      this.contactsData.activeContacts[i].visibleEmail = '';
    } else {
      this.contactsData.inactiveContacts[i].email = '';
      this.contactsData.inactiveContacts[i].visibleEmail = '';
    }
  }

  openEmailDialog(event: MouseEvent, status: string) {
    this.dialogPositionY = (14 + event.clientY).toString();
    status == 'active'
      ? (this.emailDialogActive = true)
      : (this.emailDialogInactive = true);
  }

  closeEmailDialog(status: string) {
    status == 'active'
      ? (this.emailDialogActive = false)
      : (this.emailDialogInactive = false);
  }

  onInputChange(event: any, i: number, emailValue: string, status: string) {
    if (event.keyCode == 13) {
      if (event.target.id !== 'visible') {
        status == 'active'
          ? (this.contactsData.activeContacts[i].email = event.target.value)
          : (this.contactsData.inactiveContacts[i].email = event.target.value);
      } else {
        status == 'active'
          ? (this.contactsData.activeContacts[i].email = emailValue)
          : (this.contactsData.inactiveContacts[i].email = emailValue);
      }
      this.closeEmailDialog(status);
    }
  }

  visibleEmail(event: any, i: number, emailValue: string, status: string) {
    if (status === 'active') {
      this.newVisibleMailActive = event.target.value;
      this.contactsData.activeContacts[i].visibleEmail = event.target.value;
      this.onInputChange(event, i, emailValue, status);
    } else {
      this.newVisibleMailInactive = event.target.value;
      this.contactsData.inactiveContacts[i].visibleEmail = event.target.value;
      this.onInputChange(event, i, emailValue, status);
    }
  }
}
