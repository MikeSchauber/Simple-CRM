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
  badgeType: string = '';
  status: string = '';
  role: string = '';
  prio: string = '';
  badgeColorStatus: string = '';
  badgeColorRole: string = '';
  badgeColorPrio: string = '';

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
      badgeType: this.badgeType,
      status: this.status,
      role: this.role,
      prio: this.prio,
      badgeColorStatus: this.badgeColorStatus,
      badgeColorRole: this.badgeColorRole,
      badgeColorPrio: this.badgeColorPrio,
    };
  }
}
