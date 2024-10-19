export class Contact {
  emailEdit: boolean = false;
  telEdit: boolean = false;
  id: string = '';
  checked: boolean = false;
  name: string = '';
  tel: string = '';
  email: string = '';
  visibleEmail: string = '';
  emailHovered: boolean = false;
  telHovered: boolean = false;
  status: string = '';
  priorityBadge = {
    name: '',
    color: '',
    used: false,
  };
  statusBadge = {
    name: '',
    color: '',
    used: false,
  };
  roleBadge = {
    name: '',
    color: '',
    used: false,
  };
  constructor(name: string) {
    this.name = name;
  }

  public toJson() {
    return {
      emailEdit: this.emailEdit,
      telEdit: this.telEdit,
      id: this.id,
      checked: this.checked,
      name: this.name,
      tel: this.tel,
      email: this.email,
      visibleEmail: this.visibleEmail,
      emailHovered: this.emailHovered,
      telHovered: this.telHovered,
      status: this.status,
      priorityBadge: this.priorityBadge,
      statusBadge: this.statusBadge,
      roleBadge: this.roleBadge,
    };
  }
}
