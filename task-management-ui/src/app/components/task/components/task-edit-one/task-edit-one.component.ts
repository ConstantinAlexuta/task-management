import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataExchangeService } from 'src/app/shared/services/data-exchange.service';
import { Task } from '../../model/task.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/reducers';
import { getTasks } from '../../state/task.selectors';
import { Update } from '@ngrx/entity';
import { taskActionTypes } from '../../state/task.actions';

@Component({
  selector: 'app-task-edit-one',
  templateUrl: './task-edit-one.component.html',
  styleUrls: ['./task-edit-one.component.scss'],
})
export class TaskEditOneComponent implements OnInit {
  itemsLowerCaseDashName: string = 'tasks';
  index!: number;
  item!: Task;
  items!: Task[];

  @Input() viewStatus: string = 'view'; // can be 'view' or "edit" in parent

  itemForm = new FormGroup({
    index: new FormControl(''),
    id: new FormControl(''),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    status: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) {}

  viewComeBackFromCancelEditViewSubscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.index = +this.activatedRoute.snapshot.parent?.params.id - 1;

    this.getItem();

    this.loadItemIntoItemForm();

    this.messageFromCancel = false;

    this.viewComeBackFromCancelEditViewSubscription = this.dataExchangeService.currentMessageFromCancel.subscribe(
      (value) => (this.messageFromCancel = value)
    );
  }

  async getItem() {
    let currentIndex = +this.activatedRoute.snapshot.parent?.params.id - 1;

    this.store.select(getTasks).subscribe(
      (data) => {
        this.items = data;
        this.item = this.items[currentIndex];
      },
      (err) => console.error(err),
      () => console.log('items array loaded')
    );
  }

  submitForm() {
    if (!this.itemForm.valid) {
      this.showMessageIfItemFormIsInvalid = true;
      setTimeout(() => {
        this.showMessageIfItemFormIsInvalid = false;
      }, 10000);
    } else {
      // form is valid
      this.showMessageIfItemFormIsInvalid = false;

      this.showMessageIfWasSavedWithBankSpacesAtMargins = false;

      this.verifyIfItemFromFormIsEqualWithInitialItem();

      if (!this.editedItemIsDifferentThanInitialItem) {
        this.showMessageItemHasNotthingChanged = true;

        this.itemForm.markAsUntouched;
        this.itemForm.markAsPristine;
      }

      if (this.editedItemIsDifferentThanInitialItem) {
        this.updateItem();

        this.verifyIfModificationIsSavedOnServer();

        this.checkIfWasSavedWithBankSpacesAtMargins(10000);
      }

      setTimeout(() => {
        this.showMessageItemHasNotthingChanged = false;
        this.showMessageIfModificationIsSavedOnServerWithSuccess = false;
      }, 10000);

      setTimeout(() => {
        this.showMessageIfModificationIsSavedOnServerWithFailure = false;
      }, 15000);
    }
  }

  itemModifiedSentToServer!: Task;

  updateItem() {
    const update: Update<Task> = {
      id: this.item!.id!,
      changes: {
        ...this.item,
        ...this.itemForm.value,
      },
    };

    this.itemModifiedSentToServer = { ...this.itemForm.value };

    this.store.dispatch(taskActionTypes.updateTask({ update }));
  }

  showMessageIfItemFormIsInvalid: boolean = false;

  messageIfItemFormIsInvalid: string =
    'Please fill all the required fields with valid input.';

  editedItemIsDifferentThanInitialItem: boolean = false;

  showMessageItemHasNotthingChanged = false;

  messageItemHasNotthingChanged: string =
    'The item was not saved because is the same like the initial one.';

  itemEdited!: Task;

  verifyIfItemFromFormIsEqualWithInitialItem() {
    this.itemEdited = { ...this.itemForm.value };

    if (!this.areItemsComparedEquals(this.item, this.itemEdited)) {
      this.editedItemIsDifferentThanInitialItem = true;
    } else {
      this.editedItemIsDifferentThanInitialItem = false;
    }
  }

  areItemsComparedEquals(item1: Task, item2: Task) {
    if (
      item1.id != item2.id ||
      item1.description != item2.description ||
      item1.status != item2.status
    ) {
      return false;
    } else return true;
  }

  updatedItemFromServer!: Task;

  isModificationSavedOnServerWithSuccess = false;

  showMessageIfModificationIsSavedOnServerWithSuccess: boolean = false;
  showMessageIfModificationIsSavedOnServerWithFailure: boolean = false;

  messageIfModificationIsSavedOnServerWithSuccess: string =
    'The modifications was saved with success on server.';

  messageIfModificationIsSavedOnServerWithFailure: string =
    'Failure on salvation. Please try to save again.';

  itemsReloaded!: Task[];

  timeToVerifyIfModificationIsSavedOnServer = 5000;
  timeStepToVerifyIfModificationIsSavedOnServer = 100;

  verifyIfModificationIsSavedOnServer() {
    let timeVerifiedIfModificationIsSavedOnServer = 0;

    const intervalToVerifyIfModificationIsSavedOnServer = setInterval(() => {
      if (!this.itemsReloaded) {
        this.store.select(getTasks).subscribe(
          (data) => {
            this.itemsReloaded = data;

            if (this.itemsReloaded) {
              this.isModificationSavedOnServerWithSuccess = false;

              for (let index = 0; index < this.itemsReloaded.length; index++) {
                if (this.itemsReloaded[index].id == this.item.id) {
                  if (
                    this.areItemsComparedEquals(
                      this.itemModifiedSentToServer,
                      this.itemsReloaded[index]
                    )
                  ) {
                    this.isModificationSavedOnServerWithSuccess = true;

                    this.itemForm.markAsPristine();

                    this.item = { ...this.itemModifiedSentToServer };
                    this.itemEdited = { ...this.itemModifiedSentToServer };

                    this.showMessageIfModificationIsSavedOnServerWithSuccess = true;
                    this.showMessageIfModificationIsSavedOnServerWithFailure = false;
                    this.showMessageItemHasNotthingChanged = false;
                  }
                  break;
                }
              }
            }
          },
          (err) => console.error(err),
          () => console.log('items array loaded')
        );

        clearInterval(intervalToVerifyIfModificationIsSavedOnServer);
      }

      timeVerifiedIfModificationIsSavedOnServer += this
        .timeStepToVerifyIfModificationIsSavedOnServer;
    }, this.timeStepToVerifyIfModificationIsSavedOnServer);

    if (
      timeVerifiedIfModificationIsSavedOnServer >=
      this.timeToVerifyIfModificationIsSavedOnServer
    ) {
      clearInterval(intervalToVerifyIfModificationIsSavedOnServer);
      this.showMessageIfModificationIsSavedOnServerWithFailure = true;
    }
  }

  showMessageIfWasSavedWithBankSpacesAtMargins: boolean = false;

  messageIfWasSavedWithBankSpacesAtMargins: string =
    'The item was saved with empty spaces at margins of at least one field.';

  checkIfWasSavedWithBankSpacesAtMargins(timeToShowMessageInMiliSec: number) {
    let itemForm: Task = { ...this.itemForm.value };
    let itemFormTrimed: Task = { ...itemForm };

    itemFormTrimed.description = itemForm.description!.trim();
    itemFormTrimed.status = itemForm.status!.trim();

    if (!this.areItemsComparedEquals(itemFormTrimed, itemForm)) {
      this.showMessageIfWasSavedWithBankSpacesAtMargins = true;

      setTimeout(() => {
        this.showMessageIfWasSavedWithBankSpacesAtMargins = false;
      }, timeToShowMessageInMiliSec);
    }
  }

  loadItemIntoItemForm() {
    const intervalToLoadItemIntoItemForm = setInterval(() => {
      if (this.item) {
        this.itemForm.patchValue({
          index: +this.index + 1,
          id: this.item.id,
          description: this.item.description,
          status: this.item.status,
        });

        clearInterval(intervalToLoadItemIntoItemForm);
      }
    }, 20);
  }

  clearItemForm() {
    this.itemForm.patchValue({
      description: '',
      status: '',
    });
  }

  private messageFromCancel: boolean = false;

  onCancelOrExitEdit() {
    this.messageFromCancel = true;
    this.dataExchangeService.changeMessageFromCancel(this.messageFromCancel);

    this.router.navigate([
      '../' +
        this.itemsLowerCaseDashName +
        '/view-one/' +
        (+this.index + 1) +
        '/view',
    ]);
  }

  ngOnDestroy() {
    this.viewComeBackFromCancelEditViewSubscription.unsubscribe();
  }
}
