import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { TableControlService } from './services/table-control.service';
import { Firestore } from '@angular/fire/firestore';
import { DataBackupService } from './services/data-backup.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'simple-crm';


  firestore: Firestore = inject(Firestore);

  constructor(
    public tableControl: TableControlService,
    private dataBackup: DataBackupService,
    public dataManagement: DataManagementService,
  ) {
    // this.dataBackup.addBackupData();
  }

  ngOnInit(): void {
    this.tableControl.closeAllEdits();
  }
}
