export class Contact {
  emailEdit: boolean = false;
  telEdit: boolean = false;
  id: string = '';
  checked: boolean = false;
  status: string = '';
  name: string = '';
  tel: string = '';
  email: string = '';
  visibleEmail: string = '';
  emailHovered: boolean = false;
  telHovered: boolean = false;
  color: string = '';
  userRole: string = '';
  standing: string = '';
  priority: string = '';

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
      visibleEmail: this.visibleEmail,
      emailHovered: this.emailHovered,
      telHovered: this.telHovered,
      color: this.color,
      userRole: this.userRole,
      standing: this.standing,
      priority: this.priority,
    };
  }
}
