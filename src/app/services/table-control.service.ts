import { inject, Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { DataBackupService } from './data-backup.service';
import { Firestore } from '@angular/fire/firestore';

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

  firestore: Firestore = inject(Firestore);

  constructor(private contactsData: ContactsService, private dataBackup: DataBackupService) {}

  preventDefault(event: MouseEvent) {
    event.stopPropagation();
  }

  checkAllContacts(status: string) {
    status == 'active' ? this.checkAllActives() : this.checkAllInactives();
  }

  checkAllActives() {
    if (!this.allCheckedActive) {
      this.allCheckedActive = true;
      this.dataBackup.activeContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allCheckedActive = false;
      this.dataBackup.activeContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  checkAllInactives() {
    if (!this.allCheckedInactive) {
      this.allCheckedInactive = true;
      this.dataBackup.inactiveContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allCheckedInactive = false;
      this.dataBackup.inactiveContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  async keyboardAddContact(event: KeyboardEvent, status: string) {
    if (
      status == 'active' &&
      event.keyCode === 13 &&
      this.newContactActive.length != 0
    ) {
      let user = new Contact(this.newContactActive);
      this.dataBackup.activeContacts.push(user);
      this.clearAllInputs();
    } else if (
      status == 'inactive' &&
      event.keyCode === 13 &&
      this.newContactInactive.length != 0
    ) {
      let user = new Contact(this.newContactInactive);
      this.dataBackup.inactiveContacts.push(user);
      this.clearAllInputs();
    }
  }

  mouseAddContact(status: string) {
    if (status == 'active' && this.newContactActive.length != 0) {
      let user = new Contact(this.newContactActive);
      this.dataBackup.activeContacts.push(user);
    } else if (status == 'inactive' && this.newContactInactive.length != 0) {
      let user = new Contact(this.newContactInactive);
      this.dataBackup.inactiveContacts.push(user);
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
    for (let i = 0; i < this.dataBackup.activeContacts.length; i++) {
      const contact = this.dataBackup.activeContacts[i];
      if (contact.checked === true) {
        this.dataBackup.activeContacts.splice(i, 1);
        i--;
      }
    }
  }

  handleInactiveContacts() {
    for (let i = 0; i < this.dataBackup.inactiveContacts.length; i++) {
      const contact = this.dataBackup.inactiveContacts[i];
      if (contact.checked === true) {
        this.dataBackup.inactiveContacts.splice(i, 1);
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
    this.dataBackup.activeTableColumns.push(newColumn);
    this.dataBackup.activeContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
    });
  }

  pushIntoInactiveContacts(newColumn: Column) {
    this.dataBackup.inactiveTableColumns.push(newColumn);
    this.dataBackup.inactiveContacts.forEach((contact) => {
      contact.newColumns.push(newColumn);
    });
  }

  deleteTel(i: number, status: string) {
    status == 'active'
      ? (this.dataBackup.activeContacts[i].tel = '')
      : (this.dataBackup.inactiveContacts[i].tel = '');
  }

  openTelInput(status: string) {
    status == 'active'
      ? (this.telEditActive = true)
      : (this.telEditInactive = true);
  }

  saveTelData(event: any, i: number, status: string) {
    if (event.keyCode === 13) {
      status == 'active'
        ? (this.dataBackup.activeContacts[i].tel = event.target.value)
        : (this.dataBackup.inactiveContacts[i].tel = event.target.value);
    }
  }

  deleteEmail(i: number, status: string) {
    if (status == 'active') {
      this.dataBackup.activeContacts[i].email = '';
      this.dataBackup.activeContacts[i].visibleEmail = '';
    } else {
      this.dataBackup.inactiveContacts[i].email = '';
      this.dataBackup.inactiveContacts[i].visibleEmail = '';
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
          ? (this.dataBackup.activeContacts[i].email = event.target.value)
          : (this.dataBackup.inactiveContacts[i].email = event.target.value);
      } else {
        status == 'active'
          ? (this.dataBackup.activeContacts[i].email = emailValue)
          : (this.dataBackup.inactiveContacts[i].email = emailValue);
      }
      this.closeEmailDialog(status);
    }
  }

  visibleEmail(event: any, i: number, emailValue: string, status: string) {
    if (status === 'active') {
      this.newVisibleMailActive = event.target.value;
      this.dataBackup.activeContacts[i].visibleEmail = event.target.value;
      this.onInputChange(event, i, emailValue, status);
    } else {
      this.newVisibleMailInactive = event.target.value;
      this.dataBackup.inactiveContacts[i].visibleEmail = event.target.value;
      this.onInputChange(event, i, emailValue, status);
    }
  }
}
