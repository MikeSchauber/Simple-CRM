import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { OrganisationsComponent } from './components/organisations/organisations.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { FaqComponent } from './components/faq/faq.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'organisations', component: OrganisationsComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'faq', component: FaqComponent },
];
