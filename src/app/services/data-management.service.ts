import { inject, Injectable, OnDestroy } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocFromCache,
  getDocs,
  onSnapshot,
  setDoc,
  where,
} from 'firebase/firestore';
import { TableControlService } from './table-control.service';
import { ContactsService } from './contacts.service';
import { DealsService } from './deals.service';
import { query } from '@angular/animations';
import { DataBackupService } from './data-backup.service';
import { Contact } from '../models/contact.class';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubContacts;
  // unsubDeals;

  constructor(
    public tableControl: TableControlService,
    private dataBackup: DataBackupService
  ) {
    /* Running this setDoc Functions to set Backup Data */
    // this.setCrmData();
    this.unsubContacts = onSnapshot(this.getDocRef('contacts'), (contact) => {
      contact.forEach((element) => {
        console.log(element.data());
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubContacts();
  }

  getDocRef(ref: string) {
    return collection(this.firestore, ref);
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(this.getDocRef(colId), docId);
  }

  async setCrmData() {
    await setDoc(doc(this.getDocRef('contacts')), {
      activeContacts: this.dataBackup.activeContacts,
      inactiveContacts: this.dataBackup.inactiveContacts,
      activeTableColumns: this.dataBackup.activeTableColumns,
      inactiveTableColumns: this.dataBackup.inactiveTableColumns,
    });
    await setDoc(doc(this.getDocRef('deals')), {
      deals: this.dataBackup.deals,
    });
  }
}
