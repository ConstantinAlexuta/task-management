import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-view-all-dashboard',
  templateUrl: './task-view-all-dashboard.component.html',
  styleUrls: ['./task-view-all-dashboard.component.scss'],
})
export class TaskViewAllDashboardComponent implements OnInit {
  pageBrandItem: string = 'Task management application';

  constructor() {}

  itemDashboardName: string = 'Description';

  ngOnInit(): void {}
}
