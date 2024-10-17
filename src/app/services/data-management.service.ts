import { inject, Injectable, OnDestroy } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from 'firebase/firestore';
import { DealInterface } from '../interfaces/deal-interface';
import { ContactInterface } from '../interfaces/contact-interface';
import { ColumnInterface } from '../interfaces/column-interface';
import { ActiveContactsComponent } from '../components/contacts/table/active-contacts/active-contacts.component';

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

  activeContacts: ContactInterface[] = [];
  inactiveContacts: ContactInterface[] = [];
  activeTableColumns: ColumnInterface[] = [];
  inactiveTableColumns: ColumnInterface[] = [];
  deals: DealInterface[] = [];

  activeCheck: boolean = false;
  inactiveCheck: boolean = false;

  constructor() {
    this.unsubActiveContacts = this.subList('activeContacts');
    this.unsubInactiveContacts = this.subList('inactiveContacts');
    this.unsubActiveTableColumns = this.subList('activeTableColumns');
    this.unsubInactiveTableColumns = this.subList('inactiveTableColumns');
    this.unsubDeals = this.subList('deals');
  }

  ngOnDestroy(): void {
    this.unsubActiveContacts();
    this.unsubInactiveContacts();
    this.unsubActiveTableColumns();
    this.unsubInactiveTableColumns();
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
      }
      this.checkUsedColumns();
    });
  }

  checkUsedColumns() {
    this.activeCheck = this.activeTableColumns.every((c) => c.used === true);
    this.inactiveCheck = this.inactiveTableColumns.every(
      (c) => c.used === true
    );

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
