import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, getDoc, getDocFromCache, getDocs, setDoc, where } from 'firebase/firestore';
import { TableControlService } from './table-control.service';
import { ContactsService } from './contacts.service';
import { DealsService } from './deals.service';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  firestore: Firestore = inject(Firestore);
  contactsRef = doc(this.firestore, 'contacts', 'new-collection');

  

  constructor(
    public tableControl: TableControlService,
    private contactsData: ContactsService,
    private dealsData: DealsService
  ) {
    // this.setContactsData();
    // this.setDealsData();
    this.getContactsData();
    this.getDealsData();
  }

  getContactsRef() {
    return collection(this.firestore, 'contacts');
  }

  getDealsRef() {
    return collection(this.firestore, 'deals');
  }

  /* Running this setDoc Functions to set Basic Data */

  // async setContactsData() {
  //   await setDoc(doc(this.getContactsRef(), 'new-collection'), {
  //     activeContacts: this.contactsData.activeContacts,
  //     inactiveContacts: this.contactsData.inactiveContacts,
  //     activeTableColumns: this.contactsData.activeTableColumns,
  //     inactiveTableColumns: this.contactsData.inactiveTableColumns,
  //   });
  // }

  // async setDealsData() {
  //   await setDoc(doc(this.getDealsRef(), 'new-collection'), {
  //     deals: this.dealsData.deals,
  //     tableColumns: this.dealsData.tableColumns,
  //   });
  // }

  async getContactsData() {
    const querySnapshot = await getDocs(this.getContactsRef());
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
  }

  async getDealsData() {}
}
