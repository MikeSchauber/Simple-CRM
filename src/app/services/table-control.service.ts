import { inject, Injectable } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { DataBackupService } from './data-backup.service';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { DataManagementService } from './data-management.service';
import { doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { query } from '@angular/animations';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TableControlService {
  allCheckedActive: boolean = false;
  allCheckedInactive: boolean = false;
  dialogPositionY: string = '';
  dialogPositionX: string = '';
  newContactActive: string = '';
  newContactInactive: string = '';
  newVisibleMailActive: string = '';
  newVisibleMailInactive: string = '';

  firestore: Firestore = inject(Firestore);

  constructor(
    private contactsData: ContactsService,
    private dataBackup: DataBackupService,
    private dataManagement: DataManagementService
  ) {}

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
      this.dataManagement.inactiveContacts.push(user);
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

  async deleteTel(i: string, status: string) {
    status == 'active'
      ? await updateDoc(
          this.dataManagement.getSingleDocRef('activeContacts', i),
          { tel: '' }
        )
      : await updateDoc(
          this.dataManagement.getSingleDocRef('inactiveContacts', i),
          {
            tel: '',
          }
        );
  }

  async openTelInput(status: string, i: string) {
    status == 'active'
      ? await updateDoc(
          this.dataManagement.getSingleDocRef('activeContacts', i),
          { telEdit: true }
        )
      : await updateDoc(
          this.dataManagement.getSingleDocRef('inactiveContacts', i),
          { telEdit: true }
        );
  }

  async closeAllEdits(collection: string) {
    const querySnapshot = getDocs(this.dataManagement.getDocRef(collection));
    const batch = writeBatch(this.firestore);
    (await querySnapshot).forEach((doc) => {
      batch.update(doc.ref, { telEdit: false, emailEdit: false });
    });
    await batch.commit();
  }

  async saveTelData(event: any, i: string, status: string) {
    if (event.keyCode === 13) {
      status == 'active'
        ? await updateDoc(
            this.dataManagement.getSingleDocRef('activeContacts', i),
            { tel: event.target.value, telEdit: false }
          )
        : await updateDoc(
            this.dataManagement.getSingleDocRef('inactiveContacts', i),
            {
              tel: event.target.value,
              telEdit: false,
            }
          );
    }
  }

  async deleteEmail(i: string, status: string) {
    if (status == 'active') {
      await updateDoc(
        this.dataManagement.getSingleDocRef('activeContacts', i),
        { email: '', visibleEmail: '' }
      );
    } else {
      await updateDoc(
        this.dataManagement.getSingleDocRef('inactiveContacts', i),
        { email: '', visibleEmail: '' }
      );
    }
  }

  async openEmailDialog(event: MouseEvent, status: string, i: string) {
    this.dialogPositionY = (14 + event.clientY).toString();
    this.dialogPositionX = (event.clientX - 453).toString();
    console.log(this.dialogPositionY);

    status == 'active'
      ? await updateDoc(
          this.dataManagement.getSingleDocRef('activeContacts', i),
          { emailEdit: true }
        )
      : await updateDoc(
          this.dataManagement.getSingleDocRef('inactiveContacts', i),
          { emailEdit: true }
        );
  }

  async closeEmailDialog(status: string, i: string) {
    status == 'active'
      ? await updateDoc(
          this.dataManagement.getSingleDocRef('activeContacts', i),
          { emailEdit: false }
        )
      : await updateDoc(
          this.dataManagement.getSingleDocRef('inactiveContacts', i),
          { emailEdit: false }
        );
  }

  async onInputChange(
    event: any,
    i: string,
    emailValue: string,
    status: string
  ) {
    if (event.keyCode == 13) {
      if (event.target.id !== 'visible') {
        status == 'active'
          ? await updateDoc(
              this.dataManagement.getSingleDocRef('activeContacts', i),
              { email: event.target.value }
            )
          : await updateDoc(
              this.dataManagement.getSingleDocRef('inactiveContacts', i),
              { email: event.target.value }
            );
      } else {
        status == 'active'
          ? await updateDoc(
              this.dataManagement.getSingleDocRef('activeContacts', i),
              { email: emailValue }
            )
          : await updateDoc(
              this.dataManagement.getSingleDocRef('inactiveContacts', i),
              { email: emailValue }
            );
      }
      this.closeEmailDialog(status, i);
    }
  }

  async visibleEmail(
    event: any,
    i: string,
    emailValue: string,
    status: string
  ) {
    if (status === 'active') {
      this.newVisibleMailActive = event.target.value;
      await updateDoc(
        this.dataManagement.getSingleDocRef('activeContacts', i),
        { visibleEmail: event.target.value }
      );
      this.onInputChange(event, i, emailValue, status);
    } else {
      this.newVisibleMailInactive = event.target.value;
      await updateDoc(
        this.dataManagement.getSingleDocRef('inactiveContacts', i),
        { visibleEmail: event.target.value }
      );
      this.onInputChange(event, i, emailValue, status);
    }
  }
}
