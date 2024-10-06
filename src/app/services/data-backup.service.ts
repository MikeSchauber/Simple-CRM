import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBackupService {

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

activeContacts = [
  {
    checked: false,
    status: 'active',
    name: 'Active 1',
    tel: '0151332023',
    email: 'mike.schuner@gmx.de',
    visibleEmail: 'Mike Schuner',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
  {
    checked: false,
    status: 'active',
    name: 'Active 2',
    tel: '0151432089',
    email: 'anna.schmidt@gmail.com',
    visibleEmail: 'Anna Schmidt',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
  {
    checked: false,
    status: 'active',
    name: 'Active 3',
    tel: '0151532077',
    email: 'julia.bauer@yahoo.com',
    visibleEmail: 'Julia Bauer',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{} ],
      },
    ],
  },
  {
    checked: false,
    status: 'active',
    name: 'Active 4',
    tel: '0151632066',
    email: 'felix.huber@outlook.com',
    visibleEmail: 'Felix Huber',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
  {
    checked: false,
    status: 'active',
    name: 'Active 5',
    tel: '0151732055',
    email: 'lisa.klein@web.de',
    visibleEmail: 'Lisa Klein',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
];

inactiveContacts = [
  {
    checked: false,
    status: 'inactive',
    name: 'Inactive 1',
    tel: '0151832044',
    email: 'max.muster@gmx.de',
    visibleEmail: 'Max Muster',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
  {
    checked: false,
    status: 'inactive',
    name: 'Inactive 2',
    tel: '0151932033',
    email: 'tina.mustermann@gmail.com',
    visibleEmail: 'Tina Mustermann',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
  {
    checked: false,
    status: 'inactive',
    name: 'Inactive 3',
    tel: '0151032022',
    email: 'florian.schulz@yahoo.com',
    visibleEmail: 'Florian Schulz',
    newColumns: [
      {
        name: 'Position',
        type: 'dropdown',
        availableDropdowns: [{}],
      },
    ],
  },
];

deals = [
  {
    checked: false,
    name: 'Deal 1',
    phase: 2,
    dealValue: '14000',
    responsible: 1,
    closingDate: new Date('2024-10-31'),
  },
  {
    checked: false,
    name: 'Deal 2',
    phase: 4,
    dealValue: '8000',
    responsible: 1,
    closingDate: new Date('2024-11-15'),
  },
  {
    checked: false,
    name: 'Deal 3',
    phase: 2,
    dealValue: '10000',
    responsible: 1,
    closingDate: new Date('2024-12-22'),
  },
  {
    checked: false,
    name: 'Deal 4',
    phase: 1,
    dealValue: '5000',
    responsible: 2,
    closingDate: new Date('2024-09-20'),
  },
  {
    checked: false,
    name: 'Deal 5',
    phase: 3,
    dealValue: '12000',
    responsible: 2,
    closingDate: new Date('2024-12-10'),
  },
];


  constructor() { }
}
