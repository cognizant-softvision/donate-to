import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { QuestionsSandbox } from '../questions-sandbox';
import { ControlType, ControlType2LabelMapping } from 'src/app/shared/enum/controlTypes';
import { QuestionOption } from 'src/app/shared/models/question-option.modal';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css'],
})
export class QuestionsFormComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public ControlType2LabelMapping = ControlType2LabelMapping;
  public controlTypes = Object.values(ControlType);
  public isOption = false;
  form!: FormGroup;
  optionsArray = new FormArray([]);

  @Input() questions: QuestionModel[];
  @Output() validationResult = new EventEmitter<QuestionModel[]>();

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
    defaultValueFormControl: new FormControl(''),
    itemsFormControl: new FormControl(),
  });

  constructor(
    public questionSandbox: QuestionsSandbox,
    protected i18n: NzI18nService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sandBoxSubscriptionInit();
    this.questionSandbox.loadQuestions();

    this.form = this.formBuilder.group({});
    this.addField();
    this.addField();
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

  private validateFormGroup(formGroup: FormGroup, optionGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }

    for (const i in optionGroup.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
  }

  addQuestion() {
    this.validateFormGroup(this.questionItemFormGroup, this.form);
    if (this.questionItemFormGroup.valid) {
      const questionItem = new QuestionModel();
      let options: QuestionOption[] = [];

      questionItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
      questionItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
      questionItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
      questionItem.controlType = this.questionItemFormGroup.controls.controlTypeFormControl.value;
      questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
      questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

      for (const o of this.optionsArray.value) {
        const questionOption = new QuestionOption();
        questionOption.label = o.optionLabel;
        questionOption.value = o.optionValue;
        questionOption.weight = o.weight;
        options = [...options, questionOption];
      }
      questionItem.options = options;
      this.questions = [...this.questions, questionItem];

      console.log(this.questions);
    }

    // submit
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  questionWithOptions(): boolean {
    if (this.questionItemFormGroup.controls.controlTypeFormControl.value === 'RadioButton') {
      this.isOption = true;
    }

    return this.isOption;
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const group = new FormGroup({
      id: new FormControl(''),
      optionLabel: new FormControl(''),
      optionValue: new FormControl(''),
      optionWeight: new FormControl(''),
    });

    this.optionsArray.push(group);
  }

  removeField(i: { id: number; optionLabel: string; optionValue: string }, e: MouseEvent): void {
    e.preventDefault();
    // if (this.optionsArray.length > 2) {
    //   const index = this.optionsArray.indexOf(i);
    //   this.optionsArray.splice(index, 1);
    //   console.log(this.optionsArray);
    //   this.form.removeControl(i.optionLabel);
    // }
  }
}
