import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { TableControlService } from './services/table-control.service';
import { Firestore } from '@angular/fire/firestore';
import { ContactsService } from './services/contacts.service';
import { DealsService } from './services/deals.service';
import { doc, setDoc } from 'firebase/firestore';
import { DataManagementService } from './services/data-management.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'simple-crm';
  firestore: Firestore = inject(Firestore);

  constructor(
    public tableControl: TableControlService,
    private dataManagement: DataManagementService,
  ) {

  }


}
