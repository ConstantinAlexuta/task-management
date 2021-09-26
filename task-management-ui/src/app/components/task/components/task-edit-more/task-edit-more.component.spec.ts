import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditMoreComponent } from './task-edit-more.component';

describe('TaskEditMoreComponent', () => {
  let component: TaskEditMoreComponent;
  let fixture: ComponentFixture<TaskEditMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskEditMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
