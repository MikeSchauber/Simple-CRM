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
import { DealInterface } from '../interfaces/deal-interface';
import { ContactInterface } from '../interfaces/contact-interface';
import { CellInterface } from '../interfaces/cell-interface';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubActiveContacts;
  unsubInactiveContacts;
  unsubActiveContactCells;
  unsubInactiveContactCells;
  unsubActiveTableColumns;
  unsubInactiveTableColumns;
  unsubAvailableTableColumns;
  unsubDeals;

  activeContacts: ContactInterface[] = [];
  inactiveContacts: ContactInterface[] = [];
  activeContactCells: CellInterface[] = [];
  inactiveContactCells: CellInterface[] = [];
  activeTableColumns: CellInterface[] = [];
  inactiveTableColumns: CellInterface[] = [];
  availableTableColumns: CellInterface[] = [];
  deals: DealInterface[] = [];

  contactsId: string = '';
  dealsId: string = '';

  constructor(private dataBackup: DataBackupService) {
    /* Run this addBackupData() Functions to set Backup Data */
    // this.addBackupData();
    this.unsubActiveContacts = this.subList('activeContacts');
    this.unsubInactiveContacts = this.subList('inactiveContacts');
    this.unsubActiveContactCells = this.subList('activeContactCells');
    this.unsubInactiveContactCells = this.subList('inactiveContactCells');
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
    // for (const column of this.dataBackup.activeContactCells) {
    //   await addDoc(this.getDocRef('activeContactCells'), column);
    // }
    // for (const column of this.dataBackup.inactiveContactCells) {
    //   await addDoc(this.getDocRef('inactiveContactCells'), column);
    // }
  }

  ngOnDestroy(): void {
    this.unsubActiveContacts();
    this.unsubInactiveContacts();
    this.unsubActiveContactCells();
    this.unsubInactiveContactCells();
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
      } else if (list === 'activeContactCells') {
        this.activeContactCells = this.pushIntoEachArray(querySnapshot);
      } else if (list === 'activeContactCells') {
        this.inactiveContactCells = this.pushIntoEachArray(querySnapshot);
      }
    });
  }

  querySortedDocRef(list: string) {
    if (list === 'activeTableColumns' || list === 'inactiveTableColumns') {
      return query(this.getDocRef(list), orderBy('index'));
    } else if (list === 'activeContacts' || 'inactiveContacts') {
      return query(this.getDocRef(list), orderBy('name'));
    } else if (list === 'activeContactCells' || 'inactiveContactCells') {
      return query(this.getDocRef(list), orderBy('index'));
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
