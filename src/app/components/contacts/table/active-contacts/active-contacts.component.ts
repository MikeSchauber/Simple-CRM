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
import { DataManagementService } from '../../../../services/data-management.service';

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
  columnHovered: boolean[] = [
    false,
    false,
    false
  ];

  constructor(
    public contactsData: ContactsService,
    public tableControl: TableControlService,
    public dataBackup: DataBackupService,
    public dataManagement: DataManagementService
  ) {

  }

  hoverAction(action: string, i: number) {
    if (action == 'email') {
      this.emailHovered = true;
    } else if (action == 'tel') {
      this.phoneHovered = true;
    } else if (i == 3 || i == 4 || i == 5) {
      this.columnHovered[i] = true;
    } else {
      this.mouseOutAction();
    }
  }

  mouseOutAction() {
    this.emailHovered = false;
    this.phoneHovered = false;
    this.columnHovered = [
      false,
      false,
      false
    ]
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
