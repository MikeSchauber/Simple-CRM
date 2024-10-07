import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ContactsService } from '../../../../services/contacts.service';
import { TableControlService } from '../../../../services/table-control.service';
import { DataBackupService } from '../../../../services/data-backup.service';
import { DataManagementService } from '../../../../services/data-management.service';

@Component({
  selector: 'app-inactive-contacts',
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
  templateUrl: './inactive-contacts.component.html',
  styleUrl: './inactive-contacts.component.scss',
})
export class InactiveContactsComponent {
  emailHovered: boolean = false;
  phoneHovered: boolean = false;

  constructor(
    public contactsData: ContactsService,
    public tableControl: TableControlService,
    public dataBackup: DataBackupService,
    public dataManagement: DataManagementService
  ) {}

  hoverAction(action: string) {
    if (action == 'email') {
      this.emailHovered = true;
    } else if (action == 'tel') {
      this.phoneHovered = true;
    }
  }

  mouseOutAction() {
    this.emailHovered = false;
    this.phoneHovered = false;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
