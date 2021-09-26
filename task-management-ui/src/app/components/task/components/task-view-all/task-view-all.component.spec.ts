import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewAllComponent } from './task-view-all.component';

describe('TaskViewAllComponent', () => {
  let component: TaskViewAllComponent;
  let fixture: ComponentFixture<TaskViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
