import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TableControlService } from '../../../../services/table-control.service';
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
  columnHovered: boolean[] = [
    false,
    false,
    false
  ];

  constructor(
    public tableControl: TableControlService,
    public dataManagement: DataManagementService
  ) {}

  hoverAction(action: string, i: number) {
    if (action == 'email') {
      this.dataManagement.inactiveContacts[i].emailHovered = true;
    } else if (action == 'tel') {
      this.dataManagement.inactiveContacts[i].telHovered = true;
    } else if (i == 3 || i == 4 || i == 5) {
      this.columnHovered[i] = true;
    } else {
      this.mouseOutAction();
    }
  }

  mouseOutAction() {
    this.dataManagement.inactiveContacts.forEach(contact => {
      contact.emailHovered = false;
      contact.telHovered = false;
    });
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
