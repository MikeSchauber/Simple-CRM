import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DataManagementService } from '../../services/data-management.service';
import { DashboardContactPipe } from '../../pipes/dashboard-contacts.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, DashboardContactPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public dataManagement: DataManagementService) {}
}
