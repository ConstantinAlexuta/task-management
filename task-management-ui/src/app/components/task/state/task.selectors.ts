import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, selectAll } from './task.reducers';

export const taskFeatureSelector = createFeatureSelector<TaskState>('tasks');

export const getTasks = createSelector(taskFeatureSelector, selectAll);

export const areTasksLoaded = createSelector(
  taskFeatureSelector,
  (state) => state.tasksLoaded
);
