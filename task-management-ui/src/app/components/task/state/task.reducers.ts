import { taskActionTypes } from './task.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../model/task.model';
import { createReducer, on } from '@ngrx/store';

export interface TaskState extends EntityState<Task> {
  tasksLoaded: boolean;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
  tasksLoaded: false,
});

export const taskReducer = createReducer(
  initialState,

  on(taskActionTypes.tasksLoaded, (state, action) => {
    return adapter.setAll(action.tasks, { ...state, tasksLoaded: true });
  }),

  on(taskActionTypes.taskLoaded, (state, action) => {
    return adapter.setOne(action.task, { ...state, taskLoaded: true });
  }),

  on(taskActionTypes.createTask, (state, action) => {
    return adapter.addOne(action.task, state);
  }),

  on(taskActionTypes.deleteTask, (state, action) => {
    return adapter.removeOne(action.taskId + '', state);
  }),

  on(taskActionTypes.deleteAllTasks, (state, action) => {
    return adapter.removeAll(state);
  }),

  on(taskActionTypes.updateTask, (state, action) => {
    return adapter.updateOne(action.update, state);
  })


);

export const { selectAll, selectIds } = adapter.getSelectors();
