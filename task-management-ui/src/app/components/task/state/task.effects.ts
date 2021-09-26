import { taskActionTypes } from './task.actions';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../service/task.service';

@Injectable()
export class TaskEffects {
  tasksPath: string = '/api/tasks';

  constructor(
    private taskService: TaskService,
    private actions: Actions,
    private router: Router
  ) {}

  loadTasks = createEffect(() =>
    this.actions.pipe(
      ofType(taskActionTypes.loadTasks),
      concatMap(() => this.taskService.getTasks()),
      map((tasks) => taskActionTypes.tasksLoaded({ tasks }))
    )
  );

  ////////// >???????????????
  loadTask = createEffect(() =>
    this.actions.pipe(
      ofType(taskActionTypes.loadTask),
      concatMap((action) => this.taskService.getTask(action.type)), /// ???????????
      map((task) => taskActionTypes.taskLoaded({ task }))
    )
  );

  createTask = createEffect(
    () =>
      this.actions.pipe(
        ofType(taskActionTypes.createTask),
        concatMap((action) => this.taskService.createTask(action.task)),
        tap(() => this.router.navigateByUrl(this.tasksPath))
      ),
    { dispatch: false }
  );

  deleteTask = createEffect(
    () =>
      this.actions.pipe(
        ofType(taskActionTypes.deleteTask),
        concatMap((action) => this.taskService.deleteTask(action.taskId))
      ),
    { dispatch: false }
  );

  deleteAllTasks = createEffect(
    () =>
      this.actions.pipe(
        ofType(taskActionTypes.deleteAllTasks),
        concatMap((action) => this.taskService.deleteAllTasks())
      ),
    { dispatch: false }
  );

  updateTask = createEffect(
    () =>
      this.actions.pipe(
        ofType(taskActionTypes.updateTask),
        concatMap((action) =>
//           this.taskService.updateTask(action.update.id, action.update.changes)
          this.taskService.updateTask(action.update.changes)
        )
      ),
    { dispatch: false }
  );
}
