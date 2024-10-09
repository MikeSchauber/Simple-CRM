import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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
    // for (let i = 0; i < this.dataBackup.inactiveContacts.length; i++) {
    //   const contact = this.dataBackup.inactiveContacts[i];
    //   await addDoc(this.getDocRef('inactiveContacts'), contact);
    // }
    // for (let i = 0; i < this.dataBackup.activeTableColumns.length; i++) {
    //   const column = this.dataBackup.activeTableColumns[i];
    //   await addDoc(this.getDocRef('activeTableColumns'), column);
    // }
    // for (let i = 0; i < this.dataBackup.inactiveTableColumns.length; i++) {
    //   const column = this.dataBackup.inactiveTableColumns[i];
    //   await addDoc(this.getDocRef('inactiveTableColumns'), column);
    // }
    // for (let i = 0; i < this.dataBackup.deals.length; i++) {
    //   const deal = this.dataBackup.deals[i];
    //   await addDoc(this.getDocRef('deals'), deal);
    // }
  }

  ngOnDestroy(): void {
    this.unsubActiveContacts();
    this.unsubInactiveContacts();
    this.unsubActiveTableColumns();
    this.unsubInactiveTableColumns();
    this.unsubDeals();
  }

  subList(list: string) {
    return onSnapshot(this.getDocRef(list), (elements) => {
      elements.forEach((e) => { 
        console.log(e.data());
      });
    });
  }

  async readContactDocs(elements: QuerySnapshot) {
    this.activeContacts = [];
    this.inactiveContacts = [];
    this.activeTableColumns = [];
    this.inactiveTableColumns = [];
    elements.forEach((element) => {
      console.log(element.data);
    });
  }

  async updateContacts() {
    await updateDoc(this.getSingleDocRef('contacts', this.contactsId), {
      activeContacts: arrayUnion(...this.activeContacts),
    }).catch((err) => {
      console.error('Error updating document: ', err);
    });
  }

  async deleteContacts() {
    await deleteDoc(doc(this.getDocRef('contacts'), 'activeContacts'));
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
}
