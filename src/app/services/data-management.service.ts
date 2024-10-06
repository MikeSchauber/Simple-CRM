import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  setDoc,
  where,
} from 'firebase/firestore';
import { TableControlService } from './table-control.service';
import { ContactsService } from './contacts.service';
import { DealsService } from './deals.service';
import { query } from '@angular/animations';
import { DataBackupService } from './data-backup.service';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  firestore: Firestore = inject(Firestore);
  contactsRef = doc(this.firestore, 'crm-data', 'contacts');
  dealsRef = doc(this.firestore, 'crm-data', 'deals');

  constructor(
    public tableControl: TableControlService,
    private dataBackup: DataBackupService
  ) {
    /* Running this setDoc Functions to set Backup Data */
    // this.setCrmData();
    this.getContactsData();
    this.getDealsData();
  }

  getCrmRef() {
    return collection(this.firestore, 'crm-data');
  }

  async setCrmData() {
    await setDoc(doc(this.getCrmRef(), 'contacts'), {
      activeContacts: this.dataBackup.activeContacts,
      inactiveContacts: this.dataBackup.inactiveContacts,
      activeTableColumns: this.dataBackup.activeTableColumns,
      inactiveTableColumns: this.dataBackup.inactiveTableColumns,
    });
    await setDoc(doc(this.getCrmRef(), 'deals'), {
      deals: this.dataBackup.deals,
    });
  }

  async getContactsData() {
    const contactsSnapShot = await getDocs(this.getCrmRef());
    contactsSnapShot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
  }

  async getDealsData() {}
}
