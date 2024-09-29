import { Component } from '@angular/core';
import { GridListComponent } from './grid-list/grid-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GridListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
