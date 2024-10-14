import { ColumnInterface } from "../interfaces/column-interface";


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
  newColumns: ColumnInterface[] = [
    {
      name: '',
      type: '',
      index: 99,
      id: '',
      columnId: '',
      icon: '',
      color: '',
      availableDropdowns: [{ name: '', color: '' }],
    },
  ];

  constructor(name: string) {
    this.name = name;
  }

  public toJson() {
    return {
      emailEdit: this.emailEdit,
      telEdit: this.telEdit,
      id: this.id,
      checked: this.checked,
      status: this.status,
      name: this.name,
      tel: this.tel,
      email: this.email,
      visibleMail: this.visibleEmail,
      newColumns: this.newColumns 
    }
  }
}
