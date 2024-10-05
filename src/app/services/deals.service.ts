import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  constructor() {}

  tableColumns = [
    {
      name: 'Deal',
      type: 'text',
      availableDropdowns: [
        {
          // Jeder Deal bezieht sich auf den index eines Werts.
        },
      ],
    },
    {
      name: 'Phase.',
      type: 'dropdown',
      availableDropdowns: [{}],
    },
    {
      name: 'Deal-Wert',
      type: 'href',
      availableDropdowns: [
        {
          // Jeder Wert ist bezieht sich auf den index eines Deals
        },
      ],
    },
    {
      name: 'Verantwortlicher',
      type: 'dropdown',
      availableDropdowns: [
        {
          // Hier Aktive Kontakte aus ContactsService implementieren.
        },
      ],
    },
    {
      name: 'Erwartertetes Abschlussdatum',
      type: 'date',
      availableDropdowns: [{}],
    },
  ];

  deals = [
    {
      checked: false,
      name: "Deal 1",
      phase: 2,
      dealValue: '14000',
      responsible: 1,
      closingDate: new Date('2024-10-31'),
    },
    {
      checked: false,
      name: "Deal 2",
      phase: 4,
      dealValue: '8000',
      responsible: 1,
      closingDate: new Date('2024-11-15'),
    },
    {
      checked: false,
      name: "Deal 3",
      phase: 2,
      dealValue: '10000',
      responsible: 1,
      closingDate: new Date('2024-12-22'),
    },
  ];
}
