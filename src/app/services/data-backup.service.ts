import { Injectable } from '@angular/core';
import { DataManagementService } from './data-management.service';

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
      availableDropdowns: [],
    },
    {
      index: 3,
      columnId: '',
      id: '',
      name: 'Type',
      type: 'dropdown',
      icon: 'supervised_user_circle',
      color: '#2196f3',
      used: false,
      availableDropdowns: [
        { name: 'Artist', color: '#ff5722' },
        { name: 'Manager', color: '#2196f3' },
        { name: 'Lead', color: '#4caf50' },
        { name: 'Partner', color: '#9c27b0' },
        { name: 'Customer', color: '#ffeb3b' },
      ],
    },
    {
      index: 4,
      columnId: '',
      id: '',
      name: 'Status',
      type: 'dropdown',
      icon: 'bolt',
      color: '#4caf50',
      used: false,
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
      availableDropdowns: [
        { name: 'low', color: '#8bc34a' },
        { name: 'medium', color: '#ffc107' },
        { name: 'high', color: '#f44336' },
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
      availableDropdowns: [{}],
    },
    {
      index: 3,
      columnId: '',
      id: '',
      name: 'Type',
      type: 'dropdown',
      icon: 'supervised_user_circle',
      color: '#2196f3',
      used: false,
      availableDropdowns: [
        { name: 'Artist', color: '#ff5722' },
        { name: 'Manager', color: '#2196f3' },
        { name: 'Lead', color: '#4caf50' },
        { name: 'Partner', color: '#9c27b0' },
        { name: 'Customer', color: '#ffeb3b' },
      ],
    },
    {
      index: 4,
      columnId: '',
      id: '',
      name: 'Status',
      type: 'dropdown',
      icon: 'bolt',
      color: '#4caf50',
      used: false,
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
      availableDropdowns: [
        { name: 'low', color: '#8bc34a' },
        { name: 'medium', color: '#ffc107' },
        { name: 'high', color: '#f44336' },
      ],
    },
  ];

  activeContacts = [
    {
      id: '',
      checked: false,
      status: 'active',
      name: 'Active 1',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
      visibleEmail: 'Mike Schuner',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
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
    },
    {
      id: '',
      checked: false,
      status: 'active',
      name: 'Active 4',
      tel: '0151632066',
      email: 'felix.huber@outlook.com',
      visibleEmail: 'Felix Huber',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
    },
    {
      id: '',
      checked: false,
      status: 'active',
      name: 'Active 5',
      tel: '0151732055',
      email: 'lisa.klein@web.de',
      visibleEmail: 'Lisa Klein',
      emailEdit: false,
      telEdit: false,
      emailHovered: false,
      telHovered: false,
    },
  ];

  inactiveContacts = [
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
    },
  ];

  deals = [
    {
      id: '',
      checked: false,
      name: 'Deal 1',
      phase: 2,
      dealValue: '14000',
      responsible: 1,
      closingDate: new Date('2024-10-31'),
    },
    {
      id: '',
      checked: false,
      name: 'Deal 2',
      phase: 4,
      dealValue: '8000',
      responsible: 1,
      closingDate: new Date('2024-11-15'),
    },
    {
      id: '',
      checked: false,
      name: 'Deal 3',
      phase: 2,
      dealValue: '10000',
      responsible: 1,
      closingDate: new Date('2024-12-22'),
    },
    {
      id: '',
      checked: false,
      name: 'Deal 4',
      phase: 1,
      dealValue: '5000',
      responsible: 2,
      closingDate: new Date('2024-09-20'),
    },
    {
      id: '',
      checked: false,
      name: 'Deal 5',
      phase: 3,
      dealValue: '12000',
      responsible: 2,
      closingDate: new Date('2024-12-10'),
    },
  ];

  constructor(private dataManagement: DataManagementService) {
    /* Run this addBackupData() Functions to set Backup Data */
    // this.addBackupData();
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
    //   await addDoc(this.dataManagement.getDocRef('inactiveTableColumns'), column);
    // }
    // for (const deal of this.deals) {
    //   await addDoc(this.dataManagement.getDocRef('deals'), deal);
    // }
  }
}
