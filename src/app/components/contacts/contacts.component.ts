import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { TableControlService } from '../../services/table-control.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  constructor(public tableControl: TableControlService) {

  }

}
