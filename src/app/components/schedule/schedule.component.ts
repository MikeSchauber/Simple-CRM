import { Component } from '@angular/core';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ScheduleTableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {}
