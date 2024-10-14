import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MenuPositionX } from '@angular/material/menu';
import { ContactsService } from '../../../../services/contacts.service';
import { TableControlService } from '../../../../services/table-control.service';
import { DataBackupService } from '../../../../services/data-backup.service';
import { collection, doc, getDoc, limit, onSnapshot } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { DataManagementService } from '../../../../services/data-management.service';
import { Contact } from '../../../../models/contact.class';
import { query } from '@angular/animations';

@Component({
  selector: 'app-active-contacts',
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
  templateUrl: './active-contacts.component.html',
  styleUrl: './active-contacts.component.scss',
})
export class ActiveContactsComponent {
  emailHovered: boolean = false;
  phoneHovered: boolean = false;
  activeContacts: Contact[] = [];
  columnActive: any[] = [];
  columnHovered: boolean[] = [
    false,
    false,
    false
  ];
  firestore: Firestore = inject(Firestore);

  constructor(
    public contactsData: ContactsService,
    public tableControl: TableControlService,
    public dataBackup: DataBackupService,
    public dataManagement: DataManagementService
  ) {

  }

  hoverAction(action: string | number) {
    if (action == 'email') {
      this.emailHovered = true;
    } else if (action == 'tel') {
      this.phoneHovered = true;
    } else if (action == 0 || action == 1 || action == 2) {
      this.columnHovered[action] = true;
    }
  }

  mouseOutAction() {
    this.emailHovered = false;
    this.phoneHovered = false;
    this.columnHovered.forEach((e) => {
      e = false;
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
