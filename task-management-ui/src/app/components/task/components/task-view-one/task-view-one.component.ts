import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../../model/task.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { getTasks } from '../../state/task.selectors';

@Component({
  selector: 'app-task-view-one',
  templateUrl: './task-view-one.component.html',
  styleUrls: ['./task-view-one.component.scss'],
})
export class TaskViewOneComponent implements OnInit {
  index!: number;
  item!: Task;
  itemCapitalizeFullName: string = 'Task management application';

  itemHeaders: string[] = [
    'Database id',
    'Description',
    'Status',
  ];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.index = this.activatedRoute.snapshot.parent?.params.id;

    this.getItem();

    this.showItemListEmptyMessageAfterDelay();

    setInterval(() => {
      let newIndex = this.activatedRoute.snapshot.parent?.params.id;
      if (newIndex != this.index) {
        this.index = newIndex;
        this.getItem();
      }
    }, 50);
  }

  getItem() {
    this.store.select(getTasks).subscribe(
      (data) => {
        this.item = data[this.index - 1];
      },
      (err) => console.error(err),
      () => console.log(this.itemCapitalizeFullName + ' item was loaded')
    );
  }

  isAfterDelay: boolean = false;

  showItemListEmptyMessageAfterDelay() {
    setTimeout(() => {
      this.isAfterDelay = true;
    }, 200);
  }
}
