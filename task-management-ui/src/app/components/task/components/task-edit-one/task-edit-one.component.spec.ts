import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditOneComponent } from './task-edit-one.component';

describe('TaskEditOneComponent', () => {
  let component: TaskEditOneComponent;
  let fixture: ComponentFixture<TaskEditOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskEditOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
