import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DataManagementService } from '../../services/data-management.service';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Deal } from '../../models/deal.class';
import { Firestore } from '@angular/fire/firestore';
import { ContactInterface } from '../../interfaces/contact-interface';
import { Badge } from '../../models/badge.class';
import { Dropdown } from '../../interfaces/dropdown';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
})
export class DealsComponent {
  allChecked: boolean = false;
  newDealValue: string = '';
  today: string;
  firestore: Firestore = inject(Firestore);

  constructor(public dataManagement: DataManagementService) {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    this.today = `${year}-${month + 1}-${day}`;
  }

  checkAllDeals() {
    if (this.allChecked) {
      this.allChecked = true;
      this.dataManagement.deals.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allChecked = false;
      this.dataManagement.deals.forEach((e) => {
        e.checked = false;
      });
    }
    this.dataManagement.deals.forEach((d) => {
      console.log(d.checked);
    });
  }

  async deleteAllDeals() {
    this.dataManagement.loading = true;
    for (const deal of this.dataManagement.deals) {
      if (deal.checked) {
        await deleteDoc(doc(this.firestore, 'deals', deal.id));
      }
    }
    this.allChecked = false;
    this.dataManagement.loading = false;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  openDatePicker(dateInput: HTMLInputElement) {
    dateInput.showPicker();
  }

  returnPrettierDate(date: string) {
    let array = date.split('-');
    return `${array[2]}.${array[1]}.${array[0]}`;
  }

  async closeDatePicker(event: FocusEvent, id: string) {
    this.dataManagement.loading = true;
    let date = this.getValue(event);
    let normDate = this.returnPrettierDate(date);
    let dateAsTimestamp = new Date(date).getTime();
    await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
      closingDate: date,
      euNormDate: normDate,
      dateAsTimestamp: dateAsTimestamp,
    });
    this.dataManagement.loading = false;
  }

  async saveDealInput(event: FocusEvent, id: string, type: string) {
    let value = this.getValue(event);
    if (value.length > 0 && event.type == 'blur') {
      this.updateName(value, id, type);
    }
  }

  async saveDealWidthEnter(
    event: KeyboardEvent,
    id: string,
    inputEl: HTMLInputElement,
    type: string
  ) {
    let value = this.getValue(event);
    if (value.length > 0 && event.keyCode === 13) {
      this.updateName(value, id, type);
      inputEl.blur();
    }
  }

  async updateName(value: string, id: string, type: string) {
    this.dataManagement.loading = true;
    if (type == 'text') {
      await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
        name: value,
      });
    } else {
      let valueAsNumber = parseInt(value);
      await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
        dealValue: valueAsNumber,
      });
    }
    this.dataManagement.loading = false;
  }

  async addNewDeal(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      await this.addDealToCloud();
    }
  }

  async addDealToCloud() {
    this.dataManagement.loading = true;
    let timestamp = new Date().getTime();
    let user;
    user = new Deal({
      name: this.newDealValue,
      timestamp: timestamp,
    });
    if (this.newDealValue.length > 0) {
      await addDoc(collection(this.firestore, 'deals'), user.toJson());
      this.newDealValue = '';
    }
    this.dataManagement.loading = false;
  }

  async addBadge(
    contact: ContactInterface | Dropdown,
    id: string,
    type: string
  ) {
    this.dataManagement.loading = true;
    let badge = new Badge({
      name: contact.name,
      color: contact.color,
      used: true,
    });
    if (type == 'respo') {
      this.addRespoBadge(badge, id);
    } else {
      this.addPhaseBadge(badge, id);
    }
    this.dataManagement.loading = false;
  }

  async addRespoBadge(badge: Badge, id: string) {
    await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
      responsibleBadge: badge.toJson(),
    });
  }

  async addPhaseBadge(badge: Badge, id: string) {
    await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
      phaseBadge: badge.toJson(),
    });
  }

  async deleteBadge(id: string, type: string) {
    this.dataManagement.loading = true;
    if (type == 'respo') {
      await this.deleteRespoBadge(id);
    } else {
      await this.deletePhaseBadge(id);
    }
    this.dataManagement.loading = false;
  }

  async deleteRespoBadge(id: string) {
    await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
      responsibleBadge: {
        name: '',
        color: '',
        used: false,
      },
    });
  }

  async deletePhaseBadge(id: string) {
    await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
      phaseBadge: {
        name: '',
        color: '',
        used: false,
      },
    });
  }
}
