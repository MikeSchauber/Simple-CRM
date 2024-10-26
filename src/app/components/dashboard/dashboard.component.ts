import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DataManagementService } from '../../services/data-management.service';
import { DashboardContactPipe } from '../../pipes/dashboard-contacts.pipe';
import { CustomersPipe } from '../../pipes/customers.pipe';
import { DealSizePipe } from '../../pipes/deal-size.pipe';
import { DealWonPipe } from '../../pipes/deal-won.pipe';
import { UpcomingDealPipe } from '../../pipes/upcoming-deal.pipe';
import { DealsCheckPipe } from '../../pipes/deals-check.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    DashboardContactPipe,
    CustomersPipe,
    DealsCheckPipe,
    DealSizePipe,
    DealWonPipe,
    UpcomingDealPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public dataManagement: DataManagementService) {}
}
