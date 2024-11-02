import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  inject,
  Injectable,
  ViewChild,
} from '@angular/core';
import { Contact } from '../models/contact.class';
import { Firestore } from '@angular/fire/firestore';
import { DataManagementService } from './data-management.service';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { ContactInterface } from '../interfaces/contact-interface';
import { Dropdown } from '../interfaces/dropdown';
import { ColumnInterface } from '../interfaces/column-interface';

@Injectable({
  providedIn: 'root',
})
export class TableControlService {
  allCheckedActive: boolean = false;
  allCheckedInactive: boolean = false;
  dialogPositionY: string = '';
  dialogPositionX: string = '';
  newContactActive: string = '';
  newContactInactive: string = '';
  newVisibleMailActive: string = '';
  newVisibleMailInactive: string = '';
  editOpen: boolean = false;
  noValidEmail: boolean = false;
  colorArray = [
    '#2E8B57',
    '#4682B4',
    '#8A2BE2',
    '#D2691E',
    '#FF6347',
    '#20B2AA',
    '#FF4500',
    '#6A5ACD',
    '#CD5C5C',
    '#FF8C00',
  ];
  idsToDelete: string[] = [];
  firestore: Firestore = inject(Firestore);

  constructor(private dataManagement: DataManagementService) {}

  preventDefault(event: MouseEvent) {
    event.stopPropagation();
  }

  checkAllContacts(status: string, checkbox: boolean) {
    let contactArray: ContactInterface[];
    if (status == 'activeContacts') {
      contactArray = this.dataManagement.activeContacts;
      this.activateAllCheckboxes(checkbox, status);
    } else {
      contactArray = this.dataManagement.inactiveContacts;
      this.activateAllCheckboxes(checkbox, status);
    }
    this.handleAllCheckboxes(contactArray, checkbox);
  }

  handleAllCheckboxes(contactArray: ContactInterface[], checkbox: boolean) {
    contactArray.forEach((c) => {
      if (!checkbox) {
        c.checked = false;
      } else {
        c.checked = true;
      }
    });
  }

  activateAllCheckboxes(checkbox: boolean, status: string) {
    if (!checkbox) {
      status == 'activeContacts'
        ? (this.allCheckedActive = false)
        : (this.allCheckedInactive = false);
    } else {
      status == 'activeContacts'
        ? (this.allCheckedActive = true)
        : (this.allCheckedInactive = true);
    }
  }

  checkContact(status: string, i: number) {
    let contact: ContactInterface;
    status === 'active'
      ? (contact = this.dataManagement.activeContacts[i])
      : (contact = this.dataManagement.inactiveContacts[i]);
    if (!contact.checked) {
      contact.checked = true;
    } else {
      contact.checked = false;
    }
  }

  async deleteContacts(collection: string) {
    this.dataManagement.loading = true;
    collection == 'activeContacts'
      ? await this.handleActiveContacts(collection)
      : await this.handleInactiveContacts(collection);
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
    this.dataManagement.loading = false;
  }

  async handleActiveContacts(collection: string) {
    for (const contact of this.dataManagement.activeContacts) {
      if (contact.checked) {
        try {
          await deleteDoc(doc(this.firestore, collection, contact.id));
        } catch {
          return;
        }
      }
    }
  }

  async handleInactiveContacts(collection: string) {
    for (const contact of this.dataManagement.inactiveContacts) {
      if (contact.checked) {
        try {
          await deleteDoc(doc(this.firestore, collection, contact.id));
        } catch {
          return;
        }
      }
    }
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorArray.length);
    return this.colorArray[randomIndex];
  }

  async keyboardAddContact(event: KeyboardEvent, coll: string) {
    this.dataManagement.loading = true;
    let user = this.returnContactObject(coll);
    if (event.keyCode === 13 && user.name.length != 0) {
      await addDoc(collection(this.firestore, coll), user.toJson());
      this.clearAllInputs();
    }
    this.dataManagement.loading = false;
  }

  async mouseAddContact(coll: string) {
    this.dataManagement.loading = true;
    let user = this.returnContactObject(coll);
    if (user.name.length != 0) {
      await addDoc(collection(this.firestore, coll), user.toJson());
      this.clearAllInputs();
    }
    this.dataManagement.loading = false;
  }

  returnContactObject(coll: string) {
    let timestamp = new Date().getTime();
    let user;
    let color = this.getRandomColor();
    if (coll == 'activeContacts') {
      user = new Contact({
        name: this.newContactActive,
        status: 'active',
        timestamp: timestamp,
        color: color,
      });
    } else {
      user = new Contact({
        name: this.newContactInactive,
        status: 'inactive',
        timestamp: timestamp,
        color: color,
      });
    }
    return user;
  }

  async changeName(
    event: KeyboardEvent,
    coll: string,
    id: string,
    value: string
  ) {
    this.dataManagement.loading = true;
    let nameToUpdate: string = '';
    nameToUpdate = value;
    if (event.keyCode === 13 && nameToUpdate.length != 0) {
      this.dataManagement.loading = true;
      await updateDoc(this.dataManagement.getSingleDocRef(coll, id), {
        name: nameToUpdate,
      });
      const inputElement = event.target as HTMLInputElement;
      inputElement.blur();
      this.dataManagement.loading = false;
    }
  }

  async changeNameOnBlur(event: FocusEvent, coll: string, id: string) {
    const target = event.target as HTMLInputElement;
    const nameToUpdate: string = target.value;
    if (nameToUpdate.length != 0) {
      this.dataManagement.loading = true;
      await updateDoc(this.dataManagement.getSingleDocRef(coll, id), {
        name: nameToUpdate,
      });
    }
    this.dataManagement.loading = false;
  }

  clearAllInputs() {
    this.newContactActive = '';
    this.newContactInactive = '';
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
  }

  async addColumn(tableCollection: string, columnId: string) {
    if (
      this.dataManagement.activeContacts.length != 0 ||
      this.dataManagement.inactiveContacts.length != 0
    ) {
      this.dataManagement.loading = true;
      await updateDoc(
        this.dataManagement.getSingleDocRef(tableCollection, columnId),
        { used: true }
      );
    } else {
      console.error('There are no Contacts to add a Column into');
    }
    this.dataManagement.loading = false;
  }

  async deleteColumn(tableCollection: string, columnId: string) {
    this.dataManagement.loading = true;
    await updateDoc(
      this.dataManagement.getSingleDocRef(tableCollection, columnId),
      { used: false }
    );
    this.dataManagement.loading = false;
  }

  async deleteTel(id: string, collection: string) {
    this.dataManagement.loading = true;
    await updateDoc(this.dataManagement.getSingleDocRef(collection, id), {
      tel: '',
    });
    this.dataManagement.loading = false;
  }

  async openTelInput(collection: string, i: string, e: MouseEvent) {
    this.dataManagement.loading = true;
    e.stopPropagation();
    await this.closeAllEdits();
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      telEdit: true,
    });
    this.dataManagement.loading = false;
  }

  async closeAllEdits() {
    const batch = writeBatch(this.firestore);
    (await getDocs(this.dataManagement.getDocRef('activeContacts'))).forEach(
      (doc) => {
        batch.update(doc.ref, { telEdit: false, emailEdit: false });
      }
    );
    (await getDocs(this.dataManagement.getDocRef('inactiveContacts'))).forEach(
      (doc) => {
        batch.update(doc.ref, { telEdit: false, emailEdit: false });
      }
    );
    await batch.commit();
    this.editOpen = false;
  }

  async saveTelData(event: any, id: string, collection: string) {
    if (event.keyCode === 13) {
      this.dataManagement.loading = true;
      await updateDoc(this.dataManagement.getSingleDocRef(collection, id), {
        tel: event.target.value,
        telEdit: false,
      });
    }
    this.dataManagement.loading = false;
  }

  async saveTelOnBlur(event: FocusEvent, coll: string, id: string) {
    const target = event.target as HTMLInputElement;
    const telToUpdate: string = target.value;
    if (telToUpdate.length != 0) {
      this.dataManagement.loading = true;
      await updateDoc(this.dataManagement.getSingleDocRef(coll, id), {
        tel: telToUpdate,
        telEdit: false,
      });
    }
    this.dataManagement.loading = false;
  }

  async deleteEmail(i: string, collection: string) {
    this.dataManagement.loading = true;
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      email: '',
      visibleEmail: '',
    });
    this.dataManagement.loading = false;
  }

  async openEmailDialog(
    event: MouseEvent,
    collection: string,
    i: string,
    e: MouseEvent
  ) {
    this.dataManagement.loading = true;
    await this.closeAllEdits();
    e.stopPropagation();
    if (!this.editOpen) {
      this.editOpen = true;
      this.dialogPositionY = (14 + event.clientY).toString();
      this.dialogPositionX = (event.clientX - 453).toString();
      await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
        emailEdit: true,
      });
    }
    this.dataManagement.loading = false;
  }

  async closeEmailDialog(collection: string, i: string) {
    await updateDoc(this.dataManagement.getSingleDocRef(collection, i), {
      emailEdit: false,
    });
  }

  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async onInputKeydown(
    event: any,
    i: string,
    emailValue: string,
    coll: string
  ) {
    if (this.validateEmail(emailValue)) {
      this.noValidEmail = false;
      if (event.keyCode == 13) {
        this.dataManagement.loading = true;
        if (event.target.id == 'visible') {
          await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
            email: emailValue,
          });
        } else {
          await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
            email: event.target.value,
          });
        }
        this.closeEmailDialog(coll, i);
      }
    } else {
      this.noValidEmail = true;
    }
    this.dataManagement.loading = false;
  }

  async visibleEmail(event: any, i: string, emailValue: string, coll: string) {
    if (this.validateEmail(emailValue)) {
      this.noValidEmail = false;
      this.newVisibleMailActive = event.target.value;
      await updateDoc(this.dataManagement.getSingleDocRef(coll, i), {
        visibleEmail: event.target.value,
      });
      this.onInputKeydown(event, i, emailValue, coll);
    } else {
      this.noValidEmail = true;
    }
  }

  async addBadgeToContact(
    dropdown: Dropdown,
    cell: ColumnInterface,
    contact: ContactInterface,
    collection: string
  ) {
    this.dataManagement.loading = true;
    let badgeData = this.returnBadgeObject(cell.name, dropdown);
    await updateDoc(
      this.dataManagement.getSingleDocRef(collection, contact.id),
      badgeData
    );
    this.dataManagement.loading = false;
  }

  returnBadgeObject(category: string, dropdown: Dropdown) {
    let badgeData;
    if (category == 'User Roles') {
      badgeData = {
        roleBadge: {
          name: dropdown.name,
          color: dropdown.color,
          used: true,
        },
      };
    } else if (category == 'Standing') {
      badgeData = {
        statusBadge: {
          name: dropdown.name,
          color: dropdown.color,
          used: true,
        },
      };
    } else if (category == 'Priority') {
      badgeData = {
        priorityBadge: {
          name: dropdown.name,
          color: dropdown.color,
          used: true,
        },
      };
    } else {
      badgeData = {
        priorityBadge: {
          name: '',
          color: '',
          used: false,
        },
        statusBadge: {
          name: '',
          color: '',
          used: false,
        },
        roleBadge: {
          name: '',
          color: '',
          used: false,
        },
      };
    }
    return badgeData;
  }

  async moveContacts(collection: string) {
    this.dataManagement.loading = true;
    if (collection === 'activeContacts') {
      await this.moveActiveContacts(collection);
    } else {
      await this.moveInactiveContacts(collection);
    }
    this.allCheckedActive = false;
    this.allCheckedInactive = false;
    this.dataManagement.loading = false;
  }

  async moveActiveContacts(collection: string) {
    let dropdown = {
      name: 'Inactive',
      color: '#f44336',
      used: true,
    };
    for (const contact of this.dataManagement.activeContacts) {
      if (contact.checked === true) {
        await this.addCheckedContactsToNewTable(collection, contact, dropdown);
      }
    }
  }

  async moveInactiveContacts(collection: string) {
    let dropdown = {
      name: 'Active',
      color: '#4caf50',
      used: true,
    };
    for (const contact of this.dataManagement.inactiveContacts) {
      if (contact.checked === true) {
        await this.addCheckedContactsToNewTable(collection, contact, dropdown);
      }
    }
  }

  async deleteOldContacts(collection: string) {
    let contacts =
      collection == 'activeContacts'
        ? this.dataManagement.activeContacts
        : this.dataManagement.inactiveContacts;
    for (const contact of contacts) {
      for (const id of this.idsToDelete) {
        if (id === contact.id) {
          const docRef = doc(this.firestore, collection, contact.id);
          try {
            await deleteDoc(docRef);
          } catch {
            return;
          }
        }
      }
    }
    this.idsToDelete = [];
  }

  async addCheckedContactsToNewTable(
    status: string,
    contact: ContactInterface,
    dropdown: Dropdown
  ) {
    let newContact = this.createNewContact(status, contact, dropdown);
    newContact.checked = false;
    console.log(status);
    let addCollection =
      status === 'active' ? 'inactiveContacts' : 'activeContacts';
    let deleteCollection =
      status === 'active' ? 'activeContacts' : 'inactiveContacts';
    try {
      await addDoc(
        collection(this.firestore, addCollection),
        newContact.toJson()
      );
      this.idsToDelete.push(contact.id);
    } catch {
      return;
    }
    await this.deleteOldContacts(deleteCollection);
  }

  createNewContact(
    status: string,
    contact: ContactInterface,
    dropdown: Dropdown
  ) {
    let newContact = new Contact(contact);
    status == 'active'
      ? (newContact.status = 'inactive')
      : (newContact.status = 'active');
    newContact.statusBadge = {
      name: dropdown.name,
      color: dropdown.color,
      used: true,
    };
    return newContact;
  }
}
