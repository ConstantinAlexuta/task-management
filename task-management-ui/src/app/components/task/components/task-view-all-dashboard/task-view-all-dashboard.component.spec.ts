import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewAllDashboardComponent } from './task-view-all-dashboard.component';

describe('TaskViewAllDashboardComponent', () => {
  let component: TaskViewAllDashboardComponent;
  let fixture: ComponentFixture<TaskViewAllDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewAllDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewAllDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
