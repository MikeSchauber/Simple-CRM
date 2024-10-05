
export class Contact {
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

  public toJSON() {
    return {
      checked: this.checked,
      status: this.status,
      name: this.name,
      tel: this.tel,
      email: this.email,
      visibleEmail: this.visibleEmail,
      newColumns: this.newColumns,
    }
  }
}
