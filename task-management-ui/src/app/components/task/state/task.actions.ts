import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from '../model/task.model';

export const loadTasks = createAction('[Tasks List] Load Tasks via Service');

export const loadTask = createAction(
  '[Tasks List Operations] Load Task via Service'
);

export const tasksLoaded = createAction(
  '[Tasks Effect] Tasks Loaded Successfully',
  props<{ tasks: Task[] }>()
);

export const taskLoaded = createAction(
  '[Task Effect] Task Loaded Successfully',
  props<{ task: Task }>()
);

export const createTask = createAction(
  '[Create Task Component] Create Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks List Operations] Delete Task',
  props<{ taskId: string | number }>()
);

export const deleteAllTasks = createAction(
  '[Tasks List Operations] Delete All Tasks'
);

export const updateTask = createAction(
  '[Tasks List Operations] Update Task',
  props<{ update: Update<Task> }>()
);

export const taskActionTypes = {
  loadTasks,
  loadTask,
  tasksLoaded,
  taskLoaded,
  createTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
};
