import { inject, Injectable, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { DataBackupService } from './data-backup.service';
import { Firestore } from '@angular/fire/firestore';
import { DataManagementService } from './data-management.service';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { ColumnInterface } from '../interfaces/column-interface';

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
  noValidEmail: boolean = false;

  firestore: Firestore = inject(Firestore);

  constructor(
    private dataBackup: DataBackupService,
    private dataManagement: DataManagementService
  ) {}

  preventDefault(event: MouseEvent) {
    event.stopPropagation();
  }

  checkAllContacts(status: string) {
    status == 'activeContacts'
      ? this.checkAllActives()
      : this.checkAllInactives();
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

  async deleteContacts(collection: string) {
    collection == 'activeContacts'
      ? await this.handleActiveContacts(collection)
      : await this.handleInactiveContacts(collection);
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
  }

  async handleActiveContacts(collection: string) {
    for (const contact of this.dataManagement.activeContacts) {
      if (contact.checked === true) {
        await deleteDoc(doc(this.firestore, collection, contact.id));
      }
    }
  }

  async handleInactiveContacts(collection: string) {
    for (const contact of this.dataManagement.inactiveContacts) {
      if (contact.checked === true) {
        await deleteDoc(doc(this.firestore, collection, contact.id));
      }
    }
  }

  async keyboardAddContact(event: KeyboardEvent, coll: string) {
    let nameToAdd: string = '';
    coll == 'activeContacts'
      ? (nameToAdd = this.newContactActive)
      : (nameToAdd = this.newContactInactive);
    if (event.keyCode === 13 && nameToAdd.length != 0) {
      let user = new Contact(nameToAdd);
      await addDoc(collection(this.firestore, coll), user.toJson());
      this.clearAllInputs();
    }
  }

  async mouseAddContact(coll: string) {
    let nameToAdd: string = '';
    coll == 'inactiveContacts'
      ? (nameToAdd = this.newContactActive)
      : (nameToAdd = this.newContactInactive);
    if (nameToAdd.length != 0) {
      let user = new Contact(nameToAdd);
      await addDoc(collection(this.firestore, coll), user.toJson());
      this.clearAllInputs();
    }
  }

  clearAllInputs() {
    this.newContactActive = '';
    this.newContactInactive = '';
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
  }

  async addColumn(tableCollection: string, columnId: string) {
    if (
      this.dataManagement.activeContacts.length != 0 ||
      this.dataManagement.inactiveContacts.length != 0
    ) {
      const docSnapshot = await getDoc(
        this.dataManagement.getSingleDocRef('availableTableColumns', columnId)
      );
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const columnData = this.dataToJson(data, docSnapshot);
        const newColumn = new Column(columnData);
        console.log(newColumn);
        await this.addColumnToTableInCloud(tableCollection, newColumn);
        await this.deleteAvailableColumn(columnId);
      }
    } else {
      console.error('There are no Contacts to add a Column into');
    }
  }

  dataToJson(data: DocumentData, docSnapshot: QueryDocumentSnapshot) {
    return {
      name: data['name'],
      type: data['type'],
      index: data['index'],
      columnId: docSnapshot.id,
      id: data['id'],
      icon: data['icon'],
      color: data['color'],
      used: data['used'],
      availableDropdowns: data['availableDropdowns'],
    };
  }

  async addColumnToTableInCloud(tableCollection: string, newColumn: Column) {
    await addDoc(
      collection(this.firestore, tableCollection),
      newColumn.toJson()
    );
  }

  async deleteAvailableColumn(id: string) {
    await updateDoc(
      this.dataManagement.getSingleDocRef('availableTableColumns', id),
      {
        used: true,
      }
    );
  }

  async deleteTel(id: string, collection: string) {
    await updateDoc(this.dataManagement.getSingleDocRef(collection, id), {
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

  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async onInputKeydown(
    event: any,
    i: string,
    emailValue: string,
    coll: string
  ) {
    if (this.validateEmail(emailValue)) {
      this.noValidEmail = false;
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
    } else {
      this.noValidEmail = true;
    }
  }

  async visibleEmail(event: any, i: string, emailValue: string, coll: string) {
    if (this.validateEmail(emailValue)) {
      this.noValidEmail = false;
      this.newVisibleMailActive = event.target.value;
      await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
        visibleEmail: event.target.value,
      });
      this.onInputKeydown(event, i, emailValue, coll);
    } else {
      this.noValidEmail = true;
    }
  }
}
