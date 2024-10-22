import { DealInterface } from "../interfaces/deal-interface";

export class Deal {
  id: string = '';
  checked: boolean = false;
  name: string = 'Deal 1';
  phase: string = '';
  dealValue: string = '';
  responsible: string = '';
  closingDate: string = '';
  timestamp: number = 0;

  constructor(obj: Partial<DealInterface>) {
    this.id = obj.id ? obj.id : '';
    this.checked = obj.checked ? obj.checked : false;
    this.name = obj.name ? obj.name : 'Deal 1';
    this.phase = obj.phase ? obj.phase : '';
    this.dealValue = obj.dealValue ? obj.dealValue : '';
    this.responsible = obj.responsible ? obj.responsible : '';
    this.closingDate = obj.closingDate ? obj.closingDate : '';
    this.timestamp = obj.timestamp ? obj.timestamp : 0;
  }

  toJson() {
    return {
      id: this.id,
      checked: this.checked,
      name: this.name,
      phase: this.phase,
      dealValue: this.dealValue,
      responsible: this.responsible,
      closingDate: this.closingDate,
      timestamp: this.timestamp,
    };
  }
}