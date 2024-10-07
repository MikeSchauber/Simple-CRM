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
  QuerySnapshot,
  setDoc,
  where,
} from 'firebase/firestore';
import { TableControlService } from './table-control.service';
import { ContactsService } from './contacts.service';
import { DealsService } from './deals.service';
import { query } from '@angular/animations';
import { DataBackupService } from './data-backup.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { Deal } from '../models/deal.class';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubContacts;
  unsubDeals;

  activeContacts: Contact[] = [];
  inactiveContacts: Contact[] = [];
  activeTableColumns: Column[] = [];
  inactiveTableColumns: Column[] = [];

  deals: Deal[] = [];

  constructor(
    public tableControl: TableControlService,
    private dataBackup: DataBackupService
  ) {
    /* Running this setDoc Functions to set Backup Data */
    // this.setCrmData();
    this.unsubContacts = this.subList('contacts');
    this.unsubDeals = this.subList('deals');
  }

  ngOnDestroy(): void {
    this.unsubContacts();
    this.unsubDeals();
  }

  subList(list: string) {
    return onSnapshot(this.getDocRef(list), (elements) => {
      if (list === 'contacts') {
        this.readContactDocs(elements);
      } else {
        this.readDealDocs(elements);
      }
    });
  }

  readContactDocs(elements: QuerySnapshot) {
    this.activeContacts = [];
    this.inactiveContacts = [];
    this.activeTableColumns = [];
    this.inactiveTableColumns = [];
    elements.forEach((element) => {
      this.activeContacts = element.data()['activeContacts'];
      this.inactiveContacts = element.data()['inactiveContacts'];
      this.activeTableColumns = element.data()['activeTableColumns'];
      this.inactiveTableColumns = element.data()['inactiveTableColumns'];
    });
  }

  readDealDocs(elements: QuerySnapshot) {
    this.deals = [];
    elements.forEach((element) => {
      console.log(element.data()['deals']);
    });
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
