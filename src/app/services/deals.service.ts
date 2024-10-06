import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DealsService {


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
      name: 'Phase',
      type: 'dropdown',
      availableDropdowns: [{}],
    },
    {
      name: 'Deal-Wert',
      type: 'href',
      availableDropdowns: [
        {
          // Jeder Wert bezieht sich auf den index eines Deals
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
}
