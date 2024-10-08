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
  unsubContacts;
  unsubDeals;

  activeContacts: Contact[] = [];
  inactiveContacts: Contact[] = [];
  activeTableColumns: Column[] = [];
  inactiveTableColumns: Column[] = [];

  deals: Deal[] = [];

  contactsId: string = '';
  dealsId: string = '';

  constructor(private dataBackup: DataBackupService) {
    /* Running this addCrmData() Functions to set Backup Data */
    // this.addCrmData();

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

  async addCrmData() {
    await addDoc(this.getDocRef('contacts'), {
      activeContacts: this.dataBackup.activeContacts,
      inactiveContacts: this.dataBackup.inactiveContacts,
      activeTableColumns: this.dataBackup.activeTableColumns,
      inactiveTableColumns: this.dataBackup.inactiveTableColumns,
    });
    await addDoc(this.getDocRef('deals'), {
      deals: this.dataBackup.deals,
    });
  }

  async readContactDocs(elements: QuerySnapshot) {
    this.activeContacts = [];
    this.inactiveContacts = [];
    this.activeTableColumns = [];
    this.inactiveTableColumns = [];
    elements.forEach((element) => {
      this.contactsId = element.id;
      this.activeContacts = element.data()['activeContacts'];
      this.inactiveContacts = element.data()['inactiveContacts'];
      this.activeTableColumns = element.data()['activeTableColumns'];
      this.inactiveTableColumns = element.data()['inactiveTableColumns'];
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
