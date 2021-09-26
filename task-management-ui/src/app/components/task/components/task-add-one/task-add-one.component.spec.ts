import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddOneComponent } from './task-add-one.component';

describe('TaskAddOneComponent', () => {
  let component: TaskAddOneComponent;
  let fixture: ComponentFixture<TaskAddOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAddOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
