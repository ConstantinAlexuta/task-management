import { TaskViewAllDashboardComponent } from './components/task-view-all-dashboard/task-view-all-dashboard.component';
import { TaskViewAllComponent } from './components/task-view-all/task-view-all.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskResolver } from './resolver/task.resolver';
import { TaskAddOneComponent } from './components/task-add-one/task-add-one.component';
import { TaskAddMoreComponent } from './components/task-add-more/task-add-more.component';
import { TaskEditMoreComponent } from './components/task-edit-more/task-edit-more.component';
import { TaskEditOneComponent } from './components/task-edit-one/task-edit-one.component';
import { TaskViewOneDashboardComponent } from './components/task-view-one-dashboard/task-view-one-dashboard.component';
import { TaskViewOneComponent } from './components/task-view-one/task-view-one.component';

const routes: Routes = [

  {
    path: 'tasks',
    component: TaskViewAllDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'view-all',
        pathMatch: 'full',
        // loadChildren: () =>
      },
      {
        path: 'add-more',
        component: TaskAddMoreComponent,
        data: { title: 'Add more' },
      },
      {
        path: 'add-one',
        component: TaskAddOneComponent,
        data: { title: 'Add one' },
      },
      {
        path: 'view-all',
        component: TaskViewAllComponent,
        resolve: { tasks: TaskResolver },
        data: { title: 'View all' },
      },
      {
        path: 'view-one/:id',
        component: TaskViewOneDashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          },
          {
            path: 'view',
            component: TaskViewOneComponent,
            data: { title: 'View item' },
          },
          {
            path: 'next/:id',
            component: TaskViewOneComponent,
            data: { title: 'Next item' },
          },
          {
            path: 'edit',
            component: TaskEditOneComponent,
            data: { title: 'Edit item' },
          },
        ],
      },
      {
        path: 'edit-more',
        component: TaskEditMoreComponent,
        data: { title: 'Edit more' },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
