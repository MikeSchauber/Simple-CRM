import { inject, Injectable, OnDestroy } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { DataBackupService } from './data-backup.service';
import { ColumnInterface } from '../interfaces/column-interface';
import { DealInterface } from '../interfaces/deal-interface';
import { ContactInterface } from '../interfaces/contact-interface';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubActiveContacts;
  unsubInactiveContacts;
  unsubActiveTableColumns;
  unsubInactiveTableColumns;
  unsubAvailableTableColumns;
  unsubDeals;

  activeContacts: ContactInterface[] = [];
  inactiveContacts: ContactInterface[] = [];
  activeTableColumns: ColumnInterface[] = [];
  inactiveTableColumns: ColumnInterface[] = [];
  availableTableColumns: ColumnInterface[] = [];
  deals: DealInterface[] = [];

  contactsId: string = '';
  dealsId: string = '';

  constructor(private dataBackup: DataBackupService) {
    /* Run this addBackupData() Functions to set Backup Data */
    // this.addBackupData();
    this.unsubActiveContacts = this.subList('activeContacts');
    this.unsubInactiveContacts = this.subList('inactiveContacts');
    this.unsubActiveTableColumns = this.subList('activeTableColumns');
    this.unsubInactiveTableColumns = this.subList('inactiveTableColumns');
    this.unsubAvailableTableColumns = this.subList('availableTableColumns');
    this.unsubDeals = this.subList('deals');
  }

  async addBackupData() {
    // for (const contact of this.dataBackup.activeContacts) {
    //   await addDoc(this.getDocRef('activeContacts'), contact);
    // }
    // for (const contact of this.dataBackup.inactiveContacts) {
    //   await addDoc(this.getDocRef('inactiveContacts'), contact);
    // }
    // for (const column of this.dataBackup.activeTableColumns) {
    //   await addDoc(this.getDocRef('activeTableColumns'), column);
    // }
    // for (const column of this.dataBackup.inactiveTableColumns) {
    //   await addDoc(this.getDocRef('inactiveTableColumns'), column);
    // }
    // for (const deal of this.dataBackup.deals) {
    //   await addDoc(this.getDocRef('deals'), deal);
    // }
    // for (const column of this.dataBackup.availableColumnTypes) {
    //   await addDoc(this.getDocRef('availableTableColumns'), column);
    // }
  }


  ngOnDestroy(): void {
    this.unsubActiveContacts();
    this.unsubInactiveContacts();
    this.unsubActiveTableColumns();
    this.unsubInactiveTableColumns();
    this.unsubAvailableTableColumns();
    this.unsubDeals();
  }

  subList(list: string) {
    let q = this.querySortedDocRef(list);
    return onSnapshot(q, (querySnapshot) => {
      if (list === 'activeContacts') {
        this.activeContacts = this.pushIntoEachArray(querySnapshot);
      } else if (list === 'inactiveContacts') {
        this.inactiveContacts = this.pushIntoEachArray(querySnapshot);
      } else if (list === 'activeTableColumns') {
        this.activeTableColumns = this.pushIntoEachArray(querySnapshot);
      } else if (list === 'inactiveTableColumns') {
        this.inactiveTableColumns = this.pushIntoEachArray(querySnapshot);
      } else if (list === 'deals') {
        this.deals = this.pushIntoEachArray(querySnapshot);
      } else if (list === 'availableTableColumns') {
        this.availableTableColumns = this.pushIntoEachArray(querySnapshot);
      }
    });
  }

  querySortedDocRef(list: string) {
    if (list === 'activeTableColumns' || list === 'inactiveTableColumns') {
      return query(this.getDocRef(list), orderBy('index'));
    } else if (list === 'activeContacts' || 'inactiveContacts') {
      return query(this.getDocRef(list), orderBy('name'));
    } else {
      return this.getDocRef(list);
    }
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
