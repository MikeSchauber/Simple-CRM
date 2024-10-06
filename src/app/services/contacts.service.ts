import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor() {

  }

  availableColumnTypes = {
    note: {
      name: 'Deals',
      type: 'dropdown',
      availableDropdowns: [
        {
          // Hier Deals implementieren aus DealsService
        },
      ],
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


}
