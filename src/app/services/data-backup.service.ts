import { Injectable } from '@angular/core';
import { DataManagementService } from './data-management.service';
import { addDoc } from 'firebase/firestore';
import { ContactInterface } from '../interfaces/contact-interface';

@Injectable({
  providedIn: 'root',
})
export class DataBackupService {
  activeTableColumns = [
    {
      index: 0,
      name: 'Contacts',
      type: 'text',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [],
    },
    {
      index: 1,
      name: 'Tel.',
      type: 'href',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [],
    },
    {
      index: 2,
      name: 'Email',
      type: 'href',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [],
    },
    {
      index: 3,
      columnId: '',
      id: '',
      name: 'User Roles',
      type: 'dropdown',
      icon: 'supervised_user_circle',
      color: '#2196f3',
      used: false,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [
        { name: 'Designer', color: '#d84315' },
        { name: 'Manager', color: '#1976d2' },
        { name: 'Lead', color: '#388e3c' },
        { name: 'Partner', color: '#7b1fa2' },
        { name: 'Developer', color: '#fbc02d' },
      ],
    },
    {
      index: 4,
      columnId: '',
      id: '',
      name: 'Standing',
      type: 'dropdown',
      icon: 'bolt',
      color: '#4caf50',
      used: false,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [
        { name: 'Active', color: '#4caf50' },
        { name: 'Inactive', color: '#f44336' },
      ],
    },
    {
      index: 5,
      columnId: '',
      id: '',
      name: 'Priority',
      type: 'dropdown',
      icon: 'priority_high',
      color: '#f44336',
      used: false,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [
        { name: 'high', color: '#f44336' },
        { name: 'medium', color: '#ffc107' },
        { name: 'low', color: '#8bc34a' },
      ],
    },
  ];

  inactiveTableColumns = [
    {
      index: 0,
      name: 'Contacts',
      type: 'text',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [{}],
    },
    {
      index: 1,
      name: 'Tel.',
      type: 'href',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [{}],
    },
    {
      index: 2,
      name: 'Email',
      type: 'href',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [{}],
    },
    {
      index: 3,
      columnId: '',
      id: '',
      name: 'User Roles',
      type: 'dropdown',
      icon: 'supervised_user_circle',
      color: '#2196f3',
      used: false,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [
        { name: 'Artist', color: '#d84315' },
        { name: 'Manager', color: '#1976d2' },
        { name: 'Lead', color: '#388e3c' },
        { name: 'Partner', color: '#7b1fa2' },
        { name: 'Customer', color: '#fbc02d' },
      ],
    },
    {
      index: 4,
      columnId: '',
      id: '',
      name: 'Standing',
      type: 'dropdown',
      icon: 'bolt',
      color: '#4caf50',
      used: false,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [
        { name: 'Active', color: '#4caf50' },
        { name: 'Inactive', color: '#f44336' },
      ],
    },
    {
      index: 5,
      columnId: '',
      id: '',
      name: 'Priority',
      type: 'dropdown',
      icon: 'priority_high',
      color: '#f44336',
      used: false,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [
        { name: 'high', color: '#f44336' },
        { name: 'medium', color: '#ffc107' },
        { name: 'low', color: '#8bc34a' },
      ],
    },
  ];

  activeContacts: ContactInterface[] = [
    {
      id: '',
      checked: false,
      status: 'active',
      name: 'Mike Schuner',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
      visibleEmail: 'Mike Schuner',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
      timestamp: 0,
      color: '#CD5C5C',
      priorityBadge: {
        name: '',
        color: '',
        used: false,
      },
      statusBadge: {
        name: '',
        color: '',
        used: false,
      },
      roleBadge: {
        name: '',
        color: '',
        used: false,
      },
    },
    {
      id: '',
      checked: false,
      status: 'active',
      name: 'Active 2',
      tel: '0151432089',
      email: 'anna.schmidt@gmail.com',
      visibleEmail: 'Anna Schmidt',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
      timestamp: 1,
      color: '#6A5ACD',
      priorityBadge: {
        name: '',
        color: '',
        used: false,
      },
      statusBadge: {
        name: '',
        color: '',
        used: false,
      },
      roleBadge: {
        name: '',
        color: '',
        used: false,
      },
    },
    {
      id: '',
      checked: false,
      status: 'active',
      name: 'Active 3',
      tel: '0151532077',
      email: 'julia.bauer@yahoo.com',
      visibleEmail: 'Julia Bauer',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
      timestamp: 2,
      color: '#FF4500',
      priorityBadge: {
        name: '',
        color: '',
        used: false,
      },
      statusBadge: {
        name: '',
        color: '',
        used: false,
      },
      roleBadge: {
        name: '',
        color: '',
        used: false,
      },
    },
  ];

  inactiveContacts: ContactInterface[] = [
    {
      id: '',
      checked: false,
      status: 'inactive',
      name: 'Inactive 1',
      tel: '0151832044',
      email: 'max.muster@gmx.de',
      visibleEmail: 'Max Muster',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
      timestamp: 0,
      color: '#20B2AA',
      priorityBadge: {
        name: '',
        color: '',
        used: false,
      },
      statusBadge: {
        name: '',
        color: '',
        used: false,
      },
      roleBadge: {
        name: '',
        color: '',
        used: false,
      },
    },
    {
      id: '',
      checked: false,
      status: 'inactive',
      name: 'Inactive 2',
      tel: '0151932033',
      email: 'tina.mustermann@gmail.com',
      visibleEmail: 'Tina Mustermann',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
      timestamp: 1,
      color: '#FF6347',
      priorityBadge: {
        name: '',
        color: '',
        used: false,
      },
      statusBadge: {
        name: '',
        color: '',
        used: false,
      },
      roleBadge: {
        name: '',
        color: '',
        used: false,
      },
    },
    {
      id: '',
      checked: false,
      status: 'inactive',
      name: 'Inactive 3',
      tel: '0151032022',
      email: 'florian.schulz@yahoo.com',
      visibleEmail: 'Florian Schulz',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
      timestamp: 2,
      color: '#4682B4',
      priorityBadge: {
        name: '',
        color: '',
        used: false,
      },
      statusBadge: {
        name: '',
        color: '',
        used: false,
      },
      roleBadge: {
        name: '',
        color: '',
        used: false,
      },
    },
  ];

  dealsColumns = [
    {
      index: 0,
      name: 'Deal',
      type: 'text',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [],
    },
    {
      index: 1,
      name: 'Value',
      type: 'text',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [],
    },
    {
      index: 2,
      name: 'Phase',
      type: 'dropdown',
      columnId: '',
      id: '',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [
        { name: 'Lead', color: '#8B4513', used: false },
        { name: 'Check', color: '#4682B4', used: false },
        { name: 'Offer', color: '#6A5ACD', used: false },
        { name: 'Close', color: '#2E8B57', used: false },
        { name: 'Won', color: '#4B0082', used: false },
        { name: 'Lost', color: '#B22222', used: false },
      ],
    },
    {
      index: 3,
      columnId: '',
      id: '',
      name: 'Representative',
      type: 'dropdown',
      icon: '',
      color: '',
      used: true,
      activeDropdown: { name: '', color: '' },
      availableDropdowns: [],
    },
    {
      index: 4,
      columnId: '',
      id: '',
      name: 'Expexted Close Date',
      type: 'date',
      icon: '',
      color: '',
      used: true,
      activeDropdown: {},
      availableDropdowns: [],
    },
  ];

  deals = [
    {
      id: '',
      checked: false,
      name: 'Deal 1',
      phaseBadge: {
        name: '',
        color: '',
        used: false,
      },
      dealValue: 14000,
      responsibleBadge: {
        name: '',
        color: '',
        used: false,
      },
      closingDate: '2024-10-31',
      euNormDate: '31.10.2024',
      dateAsTimestamp: 1730332800,
      timestamp: 0,
    },
    {
      id: '',
      checked: false,
      name: 'Deal 2',
      phaseBadge: {
        name: '',
        color: '',
        used: false,
      },
      dealValue: 8000,
      responsibleBadge: {
        name: '',
        color: '',
        used: false,
      },
      closingDate: '2024-11-15',
      euNormDate: '15.11.2024',
      dateAsTimestamp: 1731628800,
      timestamp: 1,
    },
    {
      id: '',
      checked: false,
      name: 'Deal 3',
      phaseBadge: {
        name: '',
        color: '',
        used: false,
      },
      dealValue: 10000,
      responsibleBadge: {
        name: '',
        color: '',
        used: false,
      },
      closingDate: '2024-12-22',
      euNormDate: '22.12.2024',
      dateAsTimestamp: 1734825600 ,
      timestamp: 2,
    },
  ];

  constructor(private dataManagement: DataManagementService) {
    /* Run this addBackupData() Function in AppComponent.ts to set Backup Data */
  }

  async addBackupData() {
    // for (const contact of this.activeContacts) {
    //   await addDoc(this.dataManagement.getDocRef('activeContacts'), contact);
    // }
    // for (const contact of this.inactiveContacts) {
    //   await addDoc(this.dataManagement.getDocRef('inactiveContacts'), contact);
    // }
    // for (const column of this.activeTableColumns) {
    //   await addDoc(this.dataManagement.getDocRef('activeTableColumns'), column);
    // }
    // for (const column of this.inactiveTableColumns) {
    //   await addDoc(
    //     this.dataManagement.getDocRef('inactiveTableColumns'),
    //     column
    //   );
    // }
    for (const deal of this.deals) {
      await addDoc(this.dataManagement.getDocRef('deals'), deal);
    }
    // for (const column of this.dealsColumns) {
    //   await addDoc(this.dataManagement.getDocRef('dealsColumns'), column);
    // }
  }
}
