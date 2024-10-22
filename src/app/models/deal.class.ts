import { BadgeInterface } from "../interfaces/badge-interface";
import { DealInterface } from "../interfaces/deal-interface";

export class Deal {
  id: string = '';
  checked: boolean = false;
  name: string = '';
  phaseBadge: BadgeInterface = {
    name: '',
    color: '',
    used: false,
  };
  dealValue: number = 0;
  responsibleBadge: BadgeInterface = {
    name: '',
    color: '',
    used: false,
  };
  closingDate: string = '';
  timestamp: number = 0;

  constructor(obj: Partial<DealInterface>) {
    this.id = obj.id ? obj.id : '';
    this.checked = obj.checked ? obj.checked : false;
    this.name = obj.name ? obj.name : '';
    this.phaseBadge = obj.phaseBadge ? obj.phaseBadge : { name: '', color: '', used: false };
    this.dealValue = obj.dealValue ? obj.dealValue : 0;
   // this.responsibleBadge = obj.responsibleBadge ? obj.responsibleBadge : { name: '', color: '', used: false };
    this.closingDate = obj.closingDate ? obj.closingDate : '';
    this.timestamp = obj.timestamp ? obj.timestamp : 0;
  }

  toJson() {
    return {
      id: this.id,
      checked: this.checked,
      name: this.name,
      phaseBadge: this.phaseBadge,
      dealValue: this.dealValue,
      responsible: this.responsibleBadge,
      closingDate: this.closingDate,
      timestamp: this.timestamp,
    };
  }
}