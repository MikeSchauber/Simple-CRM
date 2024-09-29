import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'contacts', component: ContactsComponent }
];
