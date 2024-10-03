export class Column {
  name: string = 'string';
  type: string = 'string';
  availableDropdowns: any[] = [];

  constructor(obj: Column) {
    this.name = obj.name;
    this.type = obj.type;
    this.availableDropdowns = obj.availableDropdowns;
  }
}
