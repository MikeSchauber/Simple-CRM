import { ContactInterface } from "../interfaces/contact-interface";

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
  timestamp: number = 0;
  color: string = '#2E8B57';
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

  constructor(obj: Partial<ContactInterface>) {
    this.id = obj.id ? obj.id : '';
    this.checked = obj.checked ? obj.checked : false;
    this.name = obj.name ? obj.name : '';
    this.tel = obj.tel ? obj.tel : '';
    this.email = obj.email ? obj.email : '';
    this.visibleEmail = obj.visibleEmail ? obj.visibleEmail : '';
    this.emailEdit = obj.emailEdit ? obj.emailEdit : false;
    this.telEdit = obj.telEdit ? obj.telEdit : false;
    this.emailHovered = obj.emailHovered ? obj.emailHovered : false;
    this.telHovered = obj.telHovered ? obj.telHovered : false;
    this.status = obj.status ? obj.status : '';
    this.timestamp = obj.timestamp ? obj.timestamp : 0;
    this.color = obj.color ? obj.color : '#2E8B57';
    this.priorityBadge = obj.priorityBadge ? { ...obj.priorityBadge } : this.priorityBadge;
    this.statusBadge = obj.statusBadge ? { ...obj.statusBadge } : this.statusBadge;
    this.roleBadge = obj.roleBadge ? { ...obj.roleBadge } : this.roleBadge;
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
      timestamp: this.timestamp,
      color: this.color,
      priorityBadge: this.priorityBadge,
      statusBadge: this.statusBadge,
      roleBadge: this.roleBadge,
    };
  }
}
