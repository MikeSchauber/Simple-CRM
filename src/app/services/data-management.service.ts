import { inject, Injectable, OnDestroy } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { DataBackupService } from './data-backup.service';
import { Contact } from '../models/contact.class';
import { Column } from '../models/column.class';
import { Deal } from '../models/deal.class';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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

  addBackupCollections: string[] = [
    "activeContacts",
    "inactiveContacts",
    "activeTableColumns",
    "inactiveTableColumns",
    "deals",
  ];

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
    for (let i = 0; i < this.addBackupCollections.length; i++) {
      const collection = this.addBackupCollections[i];
      for (let i = 0; i < this.dataBackup.activeContacts.length; i++) {
        const contact = this.dataBackup.activeContacts[i];
        await addDoc(this.getDocRef(collection), contact);
      }
    };
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
        this.activeContacts = this.pushIntoEachArray(querySnapshot);
      } else if (list == 'inactiveContacts') {
        this.inactiveContacts = this.pushIntoEachArray(querySnapshot);
      } else if (list == 'activeTableColumns') {
        this.activeTableColumns = this.pushIntoEachArray(querySnapshot);
      } else if (list == 'inactiveTableColumns') {
        this.inactiveTableColumns = this.pushIntoEachArray(querySnapshot);
      } else if (list == 'deals') {
        this.deals = this.pushIntoEachArray(querySnapshot);
      }
    });
  }

  pushIntoEachArray(querySnapshot: QuerySnapshot) {
    let arrayData: any[] = [];
    querySnapshot.forEach((e) => {
      let data = e.data();
      data['id'] = e.id;
      arrayData.push(data);
    });
    return arrayData;
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
