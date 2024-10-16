import { Dropdown } from "../interfaces/dropdown";

export class Column {
  index: number = 0;
  id: string = '';
  columnId: string = '';
  name: string = '';
  type: string = '';
  icon: string = '';
  color: string = '';
  used: boolean = false;
  activeDropdown: Dropdown = {name: '', color: ''}
  availableDropdowns: Dropdown[] = [];

  constructor(obj: { name: string; type: string; index: number, columnId: string, id: string, icon: string; color: string; used: boolean, activeDropdown: Dropdown,  availableDropdowns: Dropdown[] }) {
    this.name = obj.name;
    this.type = obj.type;
    this.id = obj.id;
    this.index = obj.index;
    this.columnId = obj.columnId
    this.icon = obj.icon;
    this.color = obj.color;
    this.used = obj.used;
    this.activeDropdown;
    this.availableDropdowns = obj.availableDropdowns;
  }

  public toJson() {
    return {
      name: this.name,
      type: this.type,
      index: this.index,
      id: this.id,
      columnId: this.columnId,
      icon: this.icon,
      color: this.color,
      used: this.used,
      activeDropdown: this.activeDropdown,
      availableDropdowns: this.availableDropdowns
    }
  }
}
