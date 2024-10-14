import { Dropdown } from "../interfaces/dropdown";

export class Column {
  index: number = 0;
  name: string = '';
  type: string = '';
  icon: string = '';
  color: string = '';
  availableDropdowns: Dropdown[] = [];

  constructor(obj: { name: string; type: string; index: number, icon: string; color: string; availableDropdowns: Dropdown[] }) {
    this.name = obj.name;
    this.type = obj.type;
    this.index = obj.index;
    this.icon = obj.icon;
    this.color = obj.color;
    this.availableDropdowns = obj.availableDropdowns;
  }

  public toJson() {
    return {
      name: this.name,
      type: this.type,
      index: this.index,
      icon: this.icon,
      color: this.color,
      availableDropdowns: this.availableDropdowns
    }
  }
}
