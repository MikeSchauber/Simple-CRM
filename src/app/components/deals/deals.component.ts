import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DealsService } from '../../services/deals.service';
import { DataBackupService } from '../../services/data-backup.service';

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

  constructor(public dealsData: DealsService, public dataBackup: DataBackupService) {}

  checkAllDeals() {
    if (!this.allChecked) {
      this.allChecked = true;
      this.dataBackup.deals.forEach((e) => {
        e.checked = true;
      });
    } else {
      this.allChecked = false;
      this.dataBackup.deals.forEach((e) => {
        e.checked = false;
      });
    }
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

  openDatePicker(){
    
  }
}
