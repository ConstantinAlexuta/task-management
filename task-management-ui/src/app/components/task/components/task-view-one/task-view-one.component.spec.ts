import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewOneComponent } from './task-view-one.component';

describe('TaskViewOneComponent', () => {
  let component: TaskViewOneComponent;
  let fixture: ComponentFixture<TaskViewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskViewOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
