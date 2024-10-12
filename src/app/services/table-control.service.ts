import { inject, Injectable, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { DataBackupService } from './data-backup.service';
import { Firestore } from '@angular/fire/firestore';
import { DataManagementService } from './data-management.service';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';

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
  editOpen: boolean = false;

  firestore: Firestore = inject(Firestore);

  constructor(
    private contactsData: ContactsService,
    private dataBackup: DataBackupService,
    private dataManagement: DataManagementService
  ) { }

  preventDefault(event: MouseEvent) {
    event.stopPropagation();
  }

  checkAllContacts(status: string) {
    status == 'activeContacts' ? this.checkAllActives() : this.checkAllInactives();
  }

  checkAllActives() {
    if (!this.allCheckedActive) {
      this.allCheckedActive = true;
      this.dataManagement.activeContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allCheckedActive = false;
      this.dataManagement.activeContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  checkAllInactives() {
    if (!this.allCheckedInactive) {
      this.allCheckedInactive = true;
      this.dataManagement.inactiveContacts.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allCheckedInactive = false;
      this.dataManagement.inactiveContacts.forEach((e) => {
        e.checked = false;
      });
    }
  }

  deleteContacts(status: string) {
    status == 'activeContacts'
      ? this.handleActiveContacts(status)
      : this.handleInactiveContacts(status);
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
  }

  async handleActiveContacts(collection: string) {
    for (let i = 0; i < this.dataManagement.activeContacts.length; i++) {
      const contact = this.dataManagement.activeContacts[i];
      if (contact.checked === true) {
        await deleteDoc(doc(this.firestore, collection, contact.id))
      }
    }
  }

  async handleInactiveContacts(collection: string) {
    for (let i = 0; i < this.dataManagement.inactiveContacts.length; i++) {
      const contact = this.dataManagement.inactiveContacts[i];
      if (contact.checked === true) {
        await deleteDoc(doc(this.firestore, collection, contact.id))
      }
    }
  }

  async keyboardAddContact(event: KeyboardEvent, coll: string) {
    let nameToAdd: string = "";
    coll == 'activeContacts' ? nameToAdd = this.newContactActive : nameToAdd = this.newContactInactive
    if (event.keyCode === 13 && nameToAdd.length != 0) {
      let user = new Contact(nameToAdd);
      await addDoc(collection(this.firestore, coll),
        user.toJson()
      );
      this.clearAllInputs();
    }
  }

  async mouseAddContact(coll: string) {
    let nameToAdd: string = "";
    coll == 'inactiveContacts' ? nameToAdd = this.newContactActive : nameToAdd = this.newContactInactive
    if (nameToAdd.length != 0) {
      let user = new Contact(nameToAdd);
      await addDoc(collection(this.firestore, coll),
        user.toJson()
      );
      this.clearAllInputs();
    }
  }

  clearAllInputs() {
    this.newContactActive = '';
    this.newContactInactive = '';
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
  }

  addColumn(type: string, status: string) {
    let newColumn: Column;
    if (type == 'Type') {
      newColumn = new Column(this.contactsData.availableColumnTypes.type);
    } else if (type == 'Status') {
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

  async deleteTel(i: string, collection: string) {
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      tel: '',
    });
  }

  async openTelInput(collection: string, i: string, e: MouseEvent) {
    e.stopPropagation();
    await this.closeAllEdits();
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      telEdit: true,
    });
  }

  async closeAllEdits() {
    const activeSnapshot = getDocs(
      this.dataManagement.getDocRef('activeContacts')
    );
    const inactiveSnapshot = getDocs(
      this.dataManagement.getDocRef('inactiveContacts')
    );
    const batch = writeBatch(this.firestore);
    (await activeSnapshot).forEach((doc) => {
      batch.update(doc.ref, { telEdit: false, emailEdit: false });
    });
    (await inactiveSnapshot).forEach((doc) => {
      batch.update(doc.ref, { telEdit: false, emailEdit: false });
    });
    await batch.commit();
    this.editOpen = false;
  }

  async saveTelData(event: any, i: string, collection: string) {
    if (event.keyCode === 13) {
      await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
        tel: event.target.value,
        telEdit: false,
      });
    }
  }

  async deleteEmail(i: string, collection: string) {
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      email: '',
      visibleEmail: '',
    });
  }

  async openEmailDialog(
    event: MouseEvent,
    collection: string,
    i: string,
    e: MouseEvent
  ) {
    await this.closeAllEdits();
    e.stopPropagation();
    if (!this.editOpen) {
      this.editOpen = true;
      console.log(window.scrollY);
      this.dialogPositionY = (14 + event.clientY).toString();
      this.dialogPositionX = (event.clientX - 453).toString();
      await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
        emailEdit: true,
      });
    }
  }

  async closeEmailDialog(collection: string, i: string) {
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      emailEdit: false,
    });
  }

  async onInputKeydown(event: any, i: string, emailValue: string, coll: string
  ) {
    if (event.keyCode == 13) {
      if (event.target.id == 'visible') {
        await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
          email: emailValue,
        });
      } else {
        await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
          email: event.target.value,
        });
      }
      this.closeEmailDialog(coll, i);
    }
  }

  async visibleEmail(event: any, i: string, emailValue: string, coll: string
  ) {
    this.newVisibleMailActive = event.target.value;
    await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
      visibleEmail: event.target.value,
    });
    this.onInputKeydown(event, i, emailValue, coll);
  }
}
