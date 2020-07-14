import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { QuestionsSandbox } from '../questions-sandbox';
import { ControlType, ControlType2LabelMapping } from 'src/app/shared/enum/controlTypes';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css'],
})
export class QuestionsFormComponent implements OnInit, OnDestroy {
  public ControlType2LabelMapping = ControlType2LabelMapping;
  public controlTypes = Object.values(ControlType);

  @Input() questions: QuestionModel[];
  @Output() validationResult = new EventEmitter<QuestionModel[]>();

  private subscriptions: Subscription[] = [];

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.PriorityQuestion.Table.LabelColumn' },
    { name: 'Admin.PriorityQuestion.Table.PlaceholderColumn' },
    { name: 'Admin.PriorityQuestion.Table.OrderColumnColumn' },
    { name: 'Admin.PriorityQuestion.Table.WeightColumn' },
    { name: 'Admin.PriorityQuestion.Table.ControlTypeColumn' },
    { name: 'Admin.PriorityQuestion.Table.DefaultValueColumn' },
    { name: 'Admin.Action' },
  ];

  questionItemFormGroup = new FormGroup({
    labelFormControl: new FormControl('', Validators.required),
    placeholderFormControl: new FormControl('', Validators.required),
    weightFormControl: new FormControl('', Validators.required),
    orderFormControl: new FormControl('', Validators.required),
    controlTypeFormControl: new FormControl('', Validators.required),
    defaultValueFormControl: new FormControl('', Validators.required),
    itemsFormControl: new FormControl(),
  });

  constructor(public questionSandbox: QuestionsSandbox, protected i18n: NzI18nService) {}

  ngOnInit(): void {
    this.sandBoxSubscriptionInit();
    this.questionSandbox.loadQuestions();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private sandBoxSubscriptionInit(): void {
    this.subscriptions.push(
      this.questionSandbox.questions$.subscribe((questions) => {
        this.questions = questions;
      })
    );
  }

  private validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  addQuestion() {
    this.validateFormGroup(this.questionItemFormGroup);
    if (this.questionItemFormGroup.valid) {
      const questionItem = new QuestionModel();
      questionItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
      questionItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
      questionItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
      questionItem.controlType = this.questionItemFormGroup.controls.controlTypeFormControl.value;
      questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
      questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

      this.questions = [...this.questions, questionItem];
    }
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
