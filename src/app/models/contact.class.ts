
export class Contact {
  emailEdit: boolean = false;
  telEdit: boolean = false;
  id: string = "";
  checked: boolean = false;
  status: string = '';
  name: string = '';
  tel: string = '';
  email: string = '';
  visibleEmail: string = '';
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
