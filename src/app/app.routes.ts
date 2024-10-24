import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DealsComponent } from './components/deals/deals.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'schedule', component: ScheduleComponent },
];
