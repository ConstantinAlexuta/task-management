import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Task } from '../../model/task.model';

import { v4 as uuidv4 } from 'uuid';

import { AppState } from 'src/store/reducers';
import { Store } from '@ngrx/store';
import { createTask } from '../../state/task.actions';
import { Observable } from 'rxjs';
import { getTasks } from '../../state/task.selectors';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-add-one',
  templateUrl: './task-add-one.component.html',
  styleUrls: ['./task-add-one.component.scss'],
})
export class TaskAddOneComponent implements OnInit {
  itemCapitalizeFullName: string = 'Task management application';
  itemCamelName: string = 'task';
  itemLowerCaseDashName: string = 'task';
  itemNameDisplayed: string = 'Task management application';
    itemsDashName: string = 'tasks';

  tasksLengthFromDB: number = -1;

  taskSavedFromForm!: Task;
  taskSavedFromFormId: string = 'none';

  taskSavedFromDB!: Task;
  taskSavedFromDBId: string = 'none';
  taskSavedFromDBIndex: number = -1;

  public taskFormGroup!: FormGroup;

  constructor(private store: Store<AppState>, private router: Router) {
    this.taskFormGroup = new FormGroup({
      description: new FormControl('', [
      ]),
      status: new FormControl('', [
      ]),
    });
  }

  ngOnInit(): void {
  };


  test = 1;
  test2 = 1;

  onClearForm() {
    this.taskFormGroup.patchValue({
      id: '',
      description: '',
      status: '',
    });

    setTimeout(() => {
      this.taskFormGroup.patchValue({
        description: '',
      });
    }, 100);

    this.taskFormGroup.markAsPristine();
    this.taskFormGroup.markAsUntouched();

    this.readonlyAfterSave = '';
    this.isSavedSuccessfully = false;
    this.validMessage = '';
    this.showFillForm = true;

    this.taskSavedFromFormId = 'none';
    this.taskSavedFromDBId = 'none';
    this.taskSavedFromDBIndex = -1;

    this.enableClearFormAndFillFormCommonActions();
  }

  public taskDefault: Task = {
    description: 'Go to eat something delicious',
    status: 'To do',
  };

  showFillForm: boolean = true;

  onFillForm() {
    this.taskFormGroup.patchValue({
      id: '',
      description: this.taskDefault.description,
      status: this.taskDefault.status,
    });

    this.validMessage = '';
    this.enableClearFormAndFillFormCommonActions();
  }

  enableClearFormAndFillFormCommonActions() {
    this.isSavedSuccessfully = false;
    this.showMessageAlreadySubmitted = false;
    this.showNewItemCreatedIndexMessage = false;
    this.firstAttemptToSaveWithValidFormWasDone = false;
    this.clikOnSaveWithValidFormCount = 0;
  }

  validMessage: string = '';

  clikOnSaveWithValidFormCount: number = 0;

  onSave() {
    this.taskFormGroup.patchValue({
          status: this.taskDefault.status,
        });

    if (this.taskFormGroup.valid) {
      this.clikOnSaveWithValidFormCount++;
    }

    if (this.clikOnSaveWithValidFormCount > 1) {
      // second  time clicked on Save with valid form
      this.enableShowMessageAlreadySubmitted();
    }
  }

  onSubmit(submittedForm: any) {
    this.showNewItemCreatedIndexMessage = false;

    console.log('form submitted to be save: ' + submittedForm.value);

    if (submittedForm.invalid) {
      this.clikOnSaveWithValidFormCount = 0;
      this.validMessage =
        'Please fill out the required fields with valid inputs before submitting the form!';
      this.isSavedSuccessfully = false;
      console.log('form submitted to be saved is INVALID');

      this.firstAttemptToSaveWithValidFormWasDone = false;

      return;
    } else {
      // if submittedForm is valid

      if (this.clikOnSaveWithValidFormCount == 1) {
        // first time clicked on Save with valid form

        this.readonlyAfterSave = 'readonly';

        this.showFillForm = false;

        this.firstAttemptToSaveWithValidFormWasDone = true;

        const task: Task = {
          id: 1,
          description: submittedForm.value.description,
          status: submittedForm.value.status,
        };

        this.taskSavedFromForm = { ...task };
        this.store.dispatch(createTask({ task }));
        this.validMessage =
          'Your new ' +
          this.itemCapitalizeFullName +
          ' item has been submitted.';

        this.verifyIfIsSavedSuccessfully();

        setTimeout(() => {
          if (this.isSavedSuccessfully) {
            this.showNewItemCreatedIndexdIfSavedSuccessfully();

             this.router.navigate(['../' + this.itemsDashName + '/view-all']);

          } else {
            this.enableToShowFailureMessageOnSaving();
          }
        }, 1200);
      }
    }
  }

  isSavedSuccessfully: boolean = false;

  verifyIfIsSavedSuccessfully() {
    this.isSavedSuccessfully = false;

    setTimeout(() => {
      this.getUpdatedIndexFromDatabase();
    }, 500);
  }

  getUpdatedIndexFromDatabase() {
    let tasks: Observable<Task[]> = this.store.select(getTasks);

    tasks.forEach((tasksArray) => {
      this.tasksLengthFromDB = tasksArray.length;

      tasksArray.forEach((task) => {
        if (this.tasksAreEquals(task, this.taskSavedFromForm)) {
          this.taskSavedFromDBId = task.id + '';

          this.taskSavedFromDBIndex = tasksArray.indexOf(task);

          this.taskSavedFromDB = { ...task };

          this.isSavedSuccessfully = true;
        }
      });
    });
  }

  tasksAreEquals(task1: Task, task2: Task): boolean {
    if (
      task1.id !== task2.id ||
      task1.description !== task2.description ||
      task1.status !== task2.status
    ) {
      return false;
    } else {
      return true;
    }
  }

  showMessageAlreadySubmitted: boolean = false;

  messageAlreadySubmitted: string = 'This item was already submited.';

  enableShowMessageAlreadySubmitted() {
    this.showMessageAlreadySubmitted = true;
    this.validMessage = '';

    setTimeout(() => {
      this.showMessageAlreadySubmitted = false;
      if (this.isSavedSuccessfully) {
        this.showMessageAlreadySubmitted = false;
        this.showNewItemCreatedIndexMessage = false;
        this.firstAttemptToSaveWithValidFormWasDone = false;
        this.validMessage = 'Your item was submited and successfully saved.';
      }
    }, 7000);
  }

  readonlyAfterSave = '';

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  goToLastSavedItemView() {
    this.getUpdatedIndexFromDatabase();

    this.router.navigate([
      '../tasks/view-one',
      +this.taskSavedFromDBIndex,
      'view',
    ]);
  }

  goToLastSavedItemEditView() {
    this.getUpdatedIndexFromDatabase();

    this.router.navigate([
      '../tasks/view-one',
      +this.taskSavedFromDBIndex,
      'edit',
    ]);
  }

  showNewItemCreatedIndexMessage: boolean = false;

  newItemCreatedIndexMessage: string = '';

  showNewItemCreatedIndexdIfSavedSuccessfully() {
    this.newItemCreatedIndexMessage =
      'The new item was saved successfully' +
      (this.taskSavedFromDBIndex != -1 && this.taskSavedFromDBIndex != 0
        ? ' and has the index ' + this.taskSavedFromDBIndex
        : '') +
      '.';

    if (this.isSavedSuccessfully) {
      this.showNewItemCreatedIndexMessage = true;
    } else {
      this.showNewItemCreatedIndexMessage = false;
      this.showNewItemCreatedIndexMessage = false;
    }

    setTimeout(() => {
      this.showNewItemCreatedIndexMessage = false;
      this.validMessage = 'Your item was submited and successfully saved.';
    }, 7000);
  }

  firstAttemptToSaveWithValidFormWasDone: boolean = false;

  messageFailureForFirstAttemptToSave: string =
    'Failure on saving! The attempt to save the item on server was without success. Unknown cause! Please reload the page from browser and retry.';

  showFailureMessageOnSaving: boolean = false;

  enableToShowFailureMessageOnSaving() {
    if (
      this.firstAttemptToSaveWithValidFormWasDone &&
      !this.isSavedSuccessfully
    ) {
      this.showFailureMessageOnSaving = true;
      this.enableToShowRefreshPageInCaseOfFailureAndHideOtherOptions();
    }

    setTimeout(() => {
      this.validMessage = '';
    }, 5000);

    setTimeout(() => {
      this.messageFailureForFirstAttemptToSave = 'Refresh the page please.';
    }, 10000);

    setTimeout(() => {
      let interval = 5;
      setInterval(() => {
        this.messageFailureForFirstAttemptToSave =
          'Automatically refresh the page in ' + interval + ' seconds.';
      }, 1000);
    }, 15000);

    setTimeout(() => {
      this.reloadComponent();
    }, 20000);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  showRefreshPageInCaseOfFailureAndHideOtherOptions: boolean = false;

  enableToShowRefreshPageInCaseOfFailureAndHideOtherOptions() {
    this.showRefreshPageInCaseOfFailureAndHideOtherOptions = true;
  }

  onRefreshTheEntirePage() {
    this.reloadComponent();
  }

  isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
}
