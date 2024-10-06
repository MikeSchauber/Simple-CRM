import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
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
  contacts$;

  constructor(
    public tableControl: TableControlService,
    private dataBackup: DataBackupService
  ) {
    /* Running this setDoc Functions to set Backup Data */
    // this.setCrmData();
    this.getDealsData();
    this.contacts$ = collectionData(this.getCrmRef('contacts'));

  }

  getCrmRef(ref: string) {
    return collection(this.firestore, ref);
  }

  async setCrmData() {
    await setDoc(doc(this.getCrmRef('contacts')), {
      activeContacts: this.dataBackup.activeContacts,
      inactiveContacts: this.dataBackup.inactiveContacts,
      activeTableColumns: this.dataBackup.activeTableColumns,
      inactiveTableColumns: this.dataBackup.inactiveTableColumns,
    });
    await setDoc(doc(this.getCrmRef('deals')), {
      deals: this.dataBackup.deals,
    });
  }

  async getDealsData() {}
}
