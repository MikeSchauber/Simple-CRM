import { inject, Injectable, OnDestroy } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  FieldPath,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { DataBackupService } from './data-backup.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { Deal } from '../models/deal.class';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubActiveContacts;
  unsubInactiveContacts;
  unsubActiveTableColumns;
  unsubInactiveTableColumns;
  unsubDeals;

  activeContacts: Contact[] = [];
  inactiveContacts: Contact[] = [];
  activeTableColumns: Column[] = [];
  inactiveTableColumns: Column[] = [];

  deals: Deal[] = [];

  contactsId: string = '';
  dealsId: string = '';

  constructor(private dataBackup: DataBackupService) {
    /* Run this addBackupData() Functions to set Backup Data */
    // this.addBackupData();
    this.unsubActiveContacts = this.subList('activeContacts');
    this.unsubInactiveContacts = this.subList('inactiveContacts');
    this.unsubActiveTableColumns = this.subList('activeTableColumns');
    this.unsubInactiveTableColumns = this.subList('inactiveTableColumns');
    this.unsubDeals = this.subList('deals');
  }

  async addBackupData() {
    for (let i = 0; i < this.dataBackup.activeContacts.length; i++) {
      const contact = this.dataBackup.activeContacts[i];
      await addDoc(this.getDocRef('activeContacts'), contact);
    }
    for (let i = 0; i < this.dataBackup.inactiveContacts.length; i++) {
      const contact = this.dataBackup.inactiveContacts[i];
      await addDoc(this.getDocRef('inactiveContacts'), contact);
    }
    for (let i = 0; i < this.dataBackup.activeTableColumns.length; i++) {
      const column = this.dataBackup.activeTableColumns[i];
      await addDoc(this.getDocRef('activeTableColumns'), column);
    }
    for (let i = 0; i < this.dataBackup.inactiveTableColumns.length; i++) {
      const column = this.dataBackup.inactiveTableColumns[i];
      await addDoc(this.getDocRef('inactiveTableColumns'), column);
    }
    for (let i = 0; i < this.dataBackup.deals.length; i++) {
      const deal = this.dataBackup.deals[i];
      await addDoc(this.getDocRef('deals'), deal);
    }
  }

  ngOnDestroy(): void {
    this.unsubActiveContacts();
    this.unsubInactiveContacts();
    this.unsubActiveTableColumns();
    this.unsubInactiveTableColumns();
    this.unsubDeals();
  }

  subList(list: string) {
    return onSnapshot(this.getDocRef(list), (querySnapshot) => {
      if (list == 'activeContacts') {
        this.pushIntoActiveContacts(querySnapshot);
      } else if (list == 'inactiveContacts') {
        this.pushIntoInactiveContacts(querySnapshot);
      } else if (list == 'activeTableColumns') {
        this.pushIntoActiveTableColumns(querySnapshot);
      } else if (list == 'inactiveTableColumns') {
        this.pushIntoInactiveTableColumns(querySnapshot);
      } else if (list == 'deals') {
        this.pushIntoDeals(querySnapshot);
      }
    });
  }

  pushIntoActiveContacts(querySnapshot: QuerySnapshot) {
    let activeContacts: any[] = [];
    querySnapshot.forEach((e) => {
      let data = e.data();
      data['id'] = e.id;
      activeContacts.push(data);
    });
    this.activeContacts = activeContacts;
  }

  pushIntoInactiveContacts(querySnapshot: QuerySnapshot) {
    let inactiveContacts: any[] = [];
    querySnapshot.forEach((e) => {
      let data = e.data();
      data['id'] = e.id;
      inactiveContacts.push(data);
    });
    this.inactiveContacts = inactiveContacts;
  }

  pushIntoActiveTableColumns(querySnapshot: QuerySnapshot) {
    let activeTableColumns: any[] = [];
    querySnapshot.forEach((e) => {
      let data = e.data();
      data['id'] = e.id;
      activeTableColumns.push(data);
    });
    this.activeTableColumns = activeTableColumns;
  }

  pushIntoInactiveTableColumns(querySnapshot: QuerySnapshot) {
    let inactiveTableColumns: any[] = [];
    querySnapshot.forEach((e) => {
      let data = e.data();
      data['id'] = e.id;
      inactiveTableColumns.push(data);
    });
    this.inactiveTableColumns = inactiveTableColumns;
  }

  pushIntoDeals(querySnapshot: QuerySnapshot) {
    let deals: any[] = [];
    querySnapshot.forEach((e) => {
      let data = e.data();
      data['id'] = e.id;
      deals.push(data);
    });
    this.deals = deals;
  }

  async updateContacts(id: string) {
    await updateDoc(this.getSingleDocRef('contacts', id), {
      activeContacts: arrayUnion(...this.activeContacts),
    }).catch((err) => {
      console.error('Error updating document: ', err);
    });
  }

  async deleteContacts(id: string) {
    await deleteDoc(doc(this.getDocRef('activeContacts'), id));
  }

  async readDealDocs(elements: QuerySnapshot) {
    this.deals = [];
    elements.forEach((element) => {
      this.dealsId = element.id;
      this.deals = element.data()['deals'];
    });
  }

  getDocRef(ref: string) {
    return collection(this.firestore, ref);
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(this.getDocRef(colId), docId);
  }

  getQuerySnapshot(collection: string) {
    return collectionData(this.firestore, collection);
  }
}
