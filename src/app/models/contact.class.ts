
export class Contact {
  checked: boolean = false;
  status: string = '';
  name: string = '';
  tel: string = '';
  email: string = '';
  newColumns: any = [
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
