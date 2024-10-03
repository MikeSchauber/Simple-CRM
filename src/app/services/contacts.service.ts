import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  activeTableColumns = [
    {
      name: 'Contacts',
      type: 'text',
      availableDropdowns: [{}],
    },
    {
      name: 'Tel.',
      type: 'href',
      availableDropdowns: [{}],
    },
    {
      name: 'Email',
      type: 'href',
      availableDropdowns: [{}],
    },
  ];

  inactiveTableColumns = [
    {
      class: 'contacts-cell',
      name: 'Contacts',
      type: 'text',
      availableDropdowns: [{}],
    },
    {
      name: 'Tel.',
      type: 'href',
      availableDropdowns: [{}],
    },
    {
      name: 'Email',
      type: 'href',
      availableDropdowns: [{}],
    },
  ];

  availableColumnTypes = {
    note: {
      name: 'Note',
      type: 'text',
      availableDropdowns: [{}],
    },
    type: {
      name: 'Type',
      type: 'dropdown',
      availableDropdowns: [
        { name: 'Artist', color: '#ff5722' },
        { name: 'Manager', color: '#2196f3' },
        { name: 'Lead', color: '#4caf50' },
        { name: 'Partner', color: '#9c27b0' },
        { name: 'Customer', color: '#ffeb3b' },
      ],
    },
    status: {
      name: 'Status',
      type: 'dropdown',
      availableDropdowns: [
        { name: 'Active', color: '#4caf50' },
        { name: 'Inactive', color: '#f44336' },
      ],
    },
    priority: {
      name: 'Priority',
      type: 'dropdown',
      availableDropdowns: [
        { name: 'low', color: '#8bc34a' },
        { name: 'medium', color: '#ffc107' },
        { name: 'high', color: '#f44336' },
      ],
    },
  };

  activeContacts = [
    {
      checked: false,
      status: 'active',
      name: 'Active',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
      newColumns: [
        {
          name: '',
          type: '',
          availableDropdowns: [{}],
        },
      ],
    },
  ];

  inactiveContacts = [
    {
      checked: false,
      status: 'inactive',
      name: 'Inactive',
      tel: '0151332023',
      email: 'mike.schuner@gmx.de',
      newColumns: [
        {
          name: '',
          type: '',
          availableDropdowns: [{}],
        },
      ],
    },
  ];

  constructor() { }
}