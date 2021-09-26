import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { filter, finalize, first, tap } from 'rxjs/operators';
import { AppState } from 'src/store/reducers';
import { areTasksLoaded } from '../state/task.selectors';
import { loadTasks } from '../state/task.actions';

@Injectable()
export class TaskResolver implements Resolve<Observable<any>> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areTasksLoaded),
      tap((tasksLoaded) => {
        console.log('111', tasksLoaded);
        if (!tasksLoaded) {
          this.store.dispatch(loadTasks());
        }
      }),
      filter((tasksLoaded) => tasksLoaded),
      first()
    );
  }
}
