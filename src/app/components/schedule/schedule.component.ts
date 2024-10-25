import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataManagementService } from '../../services/data-management.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DealStatusPipe } from '../../pipes/deal-status-pipe.pipe';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    DealStatusPipe,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  constructor(public dataManagement: DataManagementService) {}

  checkDealStatus(deal: any): string {
    const today = new Date();
    const diffInTime = deal.dateAsTimestamp - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    console.log(diffInDays);
    if (diffInDays > 0) {
      if (diffInDays <= 7) {
        return 'red';
      } else if (diffInDays <= 14) {
        return 'yellow';
      } else {
        return 'green';
      }
    } else {
      return 'red';
    }
  }
}
