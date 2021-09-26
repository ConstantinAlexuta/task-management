import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewAllDashboardMenuComponent } from './task-view-all-dashboard-menu.component';

describe('TaskViewAllDashboardMenuComponent', () => {
  let component: TaskViewAllDashboardMenuComponent;
  let fixture: ComponentFixture<TaskViewAllDashboardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewAllDashboardMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewAllDashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
