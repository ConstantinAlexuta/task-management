import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewOneDashboardComponent } from './task-view-one-dashboard.component';

describe('TaskViewOneDashboardComponent', () => {
  let component: TaskViewOneDashboardComponent;
  let fixture: ComponentFixture<TaskViewOneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewOneDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewOneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
