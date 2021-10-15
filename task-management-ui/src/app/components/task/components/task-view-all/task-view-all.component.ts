import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Task } from '../../model/task.model';
import { taskActionTypes } from '../../state/task.actions';

import { getTasks } from '../../state/task.selectors';
import { Update } from '@ngrx/entity';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { Router } from '@angular/router';

import { deleteAllTasks } from '../../state/task.actions';

@Component({
  selector: 'app-task-view-all',
  templateUrl: './task-view-all.component.html',
  styleUrls: ['./task-view-all.component.scss'],
})
export class TaskViewAllComponent implements OnInit {
  itemCapitalizeFullName: string = 'Task management application';
  itemCamelName: string = 'task';
  itemLowerCaseDashName: string = 'task';
  itemsLowerCaseDashName: string = 'tasks';

  items!: Observable<Task[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.items = this.store.select(getTasks);
    console.log(this.itemCapitalizeFullName + ' items was loaded from server');
    this.showItemListEmptyMessageAfterDelayIfNoItemsOrNoDatabaseConnection();
  }

  deleteTask(taskId: string | number) {
    this.store.dispatch(taskActionTypes.deleteTask({ taskId }));
  }

  deleteAllTasks() {
    this.store.dispatch(taskActionTypes.deleteAllTasks());
  }

  itemToBeUpdated!: Task | null;
  isUpdateActivated: boolean = false;

  showUpdateTaskForm(task: Task) {
    this.itemToBeUpdated = { ...task };
    this.isUpdateActivated = true;
  }

  updateTask(updateTaskForm: any) {
    const update: Update<Task> = {
      id: this.itemToBeUpdated!.id!,
      changes: {
        ...this.itemToBeUpdated,
        ...updateTaskForm.value,
      },
    };

    this.store.dispatch(taskActionTypes.updateTask({ update }));

    this.isUpdateActivated = false;

    this.itemToBeUpdated = null;
  }

  isAfterDelay: boolean = false;

  showItemListEmptyMessageAfterDelayIfNoItemsOrNoDatabaseConnection() {
    setTimeout(() => {
      this.isAfterDelay = true;
    }, 500);
  }

  showDatabaseIdColumnAndHideOptionsButtons: boolean = false;

  toggleShowDatabaseIdColumnAndHideOptionsButtons() {
    this.showDatabaseIdColumnAndHideOptionsButtons = !this
      .showDatabaseIdColumnAndHideOptionsButtons;
  }

  changeStatus(task: Task) {
      let newTask  = Object.assign({}, task);
      let newStatus  = "To do";
      if(task.status == "To do") {
        newStatus = "Done";
      }
      newTask.status = newStatus;

      const update: Update<Task> = {
        id: task!.id!,
        changes: {
          ...task,
          ...newTask,
        },
      };
      this.store.dispatch(taskActionTypes.updateTask({ update }));
    }

  onUpdate(index: number | string) {
    this.router.navigate([
      '../' + this.itemsLowerCaseDashName + '/view-one/' + index + '/edit',
    ]);
  }
}
