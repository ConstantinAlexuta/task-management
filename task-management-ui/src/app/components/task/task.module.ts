import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';

import { TaskViewAllComponent } from './components/task-view-all/task-view-all.component';
import { TaskViewOneComponent } from './components/task-view-one/task-view-one.component';
import { TaskAddOneComponent } from './components/task-add-one/task-add-one.component';
import { TaskAddMoreComponent } from './components/task-add-more/task-add-more.component';
import { TaskEditOneComponent } from './components/task-edit-one/task-edit-one.component';
import { TaskEditMoreComponent } from './components/task-edit-more/task-edit-more.component';
import { TaskViewAllDashboardMenuComponent } from './components/task-view-all-dashboard-menu/task-view-all-dashboard-menu.component';
import { TaskViewAllDashboardComponent } from './components/task-view-all-dashboard/task-view-all-dashboard.component';
import { TaskViewOneDashboardComponent } from './components/task-view-one-dashboard/task-view-one-dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskEffects } from './state/task.effects';
import { taskReducer } from './state/task.reducers';
import { TaskService } from './service/task.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TaskViewAllComponent,
    TaskViewOneComponent,
    TaskAddOneComponent,
    TaskAddMoreComponent,
    TaskEditOneComponent,
    TaskEditMoreComponent,
    TaskViewAllDashboardMenuComponent,
    TaskViewAllDashboardComponent,
    TaskViewOneDashboardComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,

    NgbModule,

    ReactiveFormsModule,
    FormsModule,

    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
  providers: [TaskService],
  bootstrap: [],
  exports: [],
})
export class TaskModule {}
