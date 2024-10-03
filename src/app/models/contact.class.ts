import { Column } from '../interfaces/column';

export class Contact {
  checked: boolean = false;
  status: string = '';
  name: string = '';
  tel: string = '';
  email: string = '';
  newColumns: Column[] = [
    {
      name: '',
      typ: '',
      availableDropdowns: [{ name: '', color: '' }],
    },
  ];

  constructor(name: string) {
    this.name = name;
  }
}
