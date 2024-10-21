import {
  Component,
} from '@angular/core';
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
  providers: [DataManagementService],
})
export class ActiveContactsComponent {
  emailHovered: boolean = false;
  phoneHovered: boolean = false;
  columnHovered: boolean[] = [false, false, false];
  allColumnsUsed: boolean = false;

  constructor(
    public tableControl: TableControlService,
    public dataManagement: DataManagementService
  ) { }

  hoverAction(action: string, i: number) {
    if (action == 'email') {
      this.dataManagement.activeContacts[i].emailHovered = true;
    } else if (action == 'tel') {
      this.dataManagement.activeContacts[i].telHovered = true;
    } else if (i == 3 || i == 4 || i == 5) {
      this.columnHovered[i] = true;
    } else {
      this.mouseOutAction();
    }
  }

  mouseOutAction() {
    this.dataManagement.activeContacts.forEach((contact) => {
      contact.emailHovered = false;
      contact.telHovered = false;
    });
    this.phoneHovered = false;
    this.columnHovered = [false, false, false];
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
