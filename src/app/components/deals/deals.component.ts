import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DataManagementService } from '../../services/data-management.service';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { Deal } from '../../models/deal.class';
import { Firestore } from '@angular/fire/firestore';

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

  firestore: Firestore = inject(Firestore);

  constructor(public dataManagement: DataManagementService) { }

  checkAllDeals() {
    if (!this.allChecked) {
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
    console.log(this.dataManagement.dealsColumns);

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  returnPrettierDate(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}`
  }

  openDatePicker(dateInput: HTMLInputElement) {
    dateInput.showPicker();
  }

  async closeDatePicker(event: FocusEvent, id: string) {
    let value = this.getValue(event);
    await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
      closingDate: value,
    });
  }

  async saveDealName(event: FocusEvent, id: string, type: string | number) {
    let value = this.getValue(event);
    if (value.length > 0 && event.type == 'blur') {
      this.updateName(value, id, type);
    }
  }

  async saveDealWidthEnter(event: KeyboardEvent, id: string, inputEl: HTMLInputElement, type: string | number) {
    let value = this.getValue(event);
    if (value.length > 0 && event.keyCode === 13) {
      this.updateName(value, id, type);
      inputEl.blur();
    }
  }

  async updateName(value: string | number, id: string, type?: string | number) {
    if (type == 'text') {
      await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
        name: value,
      });
    } else {
      await updateDoc(this.dataManagement.getSingleDocRef('deals', id), {
        dealValue: value,
      });
    }
  }

  async addNewDeal(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      await this.addDealToCloud()
    }
  }

  async addDealToCloud() {
    let timestamp = new Date().getTime();
    let user;
    user = new Deal({
      name: this.newDealValue,
      timestamp: timestamp
    });
    if (this.newDealValue.length > 0) {
      await addDoc(collection(this.firestore, 'deals'), user.toJson());
      this.newDealValue = '';
    }
  }


}
