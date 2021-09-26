import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddMoreComponent } from './task-add-more.component';

describe('TaskAddMoreComponent', () => {
  let component: TaskAddMoreComponent;
  let fixture: ComponentFixture<TaskAddMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAddMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
