export class Deal {
  id: string = '';
  checked: boolean = false;
  name: string = 'Deal';
  phase: number = 1;
  dealWert: string = '';
  verantwortlicher: number = -1;
  erwartetesAbschlussdatum: Date = new Date('2024-12-31');

  constructor() {}
}
