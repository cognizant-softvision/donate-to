import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsSandbox } from '../questions-sandbox';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionOption } from 'src/app/shared/models/question-option.modal';
import { ControlTypeModel } from 'src/app/shared/models/control-type.model';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { ControlType } from 'src/app/shared/enum/controlTypes';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css'],
})
export class QuestionsCreateComponent implements OnDestroy, OnInit {
  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  @Input() questions: QuestionModel[] = [];
  @Output() validationResult = new EventEmitter<QuestionModel[]>();

  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private loadingStatus = false;
  private controlTypes: ControlTypeModel[] = [];
  get controlTypeEnum() {
    return ControlType;
  }

  isErrorModalActive = false;
  tplModal?: NzModalRef;
  public isOption = false;
  optionsArray = new FormArray([]);
  dataSaved = false;

  label = '';
  placeholder = '';
  weight = null;
  order = null;
  defaultValue = '';
  controlTypeId = null;
  questionId = 0;
  isEdit = false;
  isQuestionsValid = true;
  isWeightValid = true;
  isRangeValid = true;
  requiredWeight = 100;

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Questions.Table.LabelColumn' },
    { name: 'Admin.Questions.Table.PlaceholderColumn' },
    { name: 'Admin.Questions.Table.OrderColumnColumn' },
    { name: 'Admin.Questions.Table.WeightColumn' },
    { name: 'Admin.Questions.Table.ControlTypeColumn' },
    { name: 'Admin.Questions.Table.DefaultValueColumn' },
    { name: 'Admin.Questions.Table.OptionsColumn' },
    { name: 'Admin.Action' },
  ];

  questionItemFormGroup = new FormGroup({
    labelFormControl: new FormControl('', Validators.required),
    placeholderFormControl: new FormControl('', Validators.required),
    weightFormControl: new FormControl('', Validators.required),
    orderFormControl: new FormControl('', Validators.required),
    controlTypeFormControl: new FormControl('', Validators.required),
    defaultValueFormControl: new FormControl(''),
    minFormControl: new FormControl(''),
    maxFormControl: new FormControl(''),
  });

  constructor(
    public questionSandbox: QuestionsSandbox,
    private router: Router,
    private dataUpdated: DataUpdatedService
  ) {}

  ngOnInit(): void {
    this.questionSandbox.loadControlTypes();
    this.questionSandbox.loadQuestions();
    this.registerEvents();
    this.addField();
    this.addField();

    this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.questionSandbox.controlTypes$.subscribe((controlTypes) => {
        this.controlTypes = JSON.parse(JSON.stringify(controlTypes));
      })
    );

    this.subscriptions.push(
      this.questionSandbox.questions$.subscribe((questions) => {
        this.questions = [];
        this.questions = JSON.parse(JSON.stringify(questions));
      })
    );

    this.subscriptions.push(
      this.questionSandbox.loadAction$.subscribe((loading) => {
        this.loadingStatus = loading;
        this.handleRequestResult();
      })
    );
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (!this.loadingStatus) {
        this.isSubmited = false;
        this.goBack();
      }
    }
  }

  createQuestions() {
    this.isSubmited = true;
    this.validateQuestions();
    if (this.isQuestionsValid) {
      this.questions.forEach((question) => {
        question.controlType = undefined;
      });
      this.questionSandbox.updateQuestions(this.questions);

      this.dataUpdated.changeMessage(true);
    }
  }

  validateQuestions() {
    this.isQuestionsValid = this.questions.length > 0 && this.sumWeight() === this.requiredWeight;
  }

  validateOptions(): boolean {
    this.isWeightValid = this.optionsWeight();
    this.isRangeValid = this.optionsRange();
    return this.isWeightValid && this.isRangeValid;
  }

  goBack() {
    this.router.navigate(['/admin/questions']);
  }

  private validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  editQuestion(item: QuestionModel) {
    this.label = item.label;
    this.placeholder = item.placeholder;
    this.weight = item.weight;
    this.order = item.order;
    this.defaultValue = item.defaultValue;
    this.controlTypeId = item.controlTypeId;
    this.questionId = item.id;
    this.isEdit = true;
  }

  addQuestion() {
    this.validateFormGroup(this.questionItemFormGroup);
    if (this.questionItemFormGroup.valid && this.validateOptions()) {
      if (this.isEdit) {
        const questionSavedItem = this.questions.find((q) => q.id === this.questionId);
        this.createQuestionItem(questionSavedItem);
        this.questions.splice(this.questions.indexOf(questionSavedItem), 1);
        this.isEdit = false;
      } else {
        const questionItem = new QuestionModel();
        this.createQuestionItem(questionItem);
      }
      this.questionItemFormGroup.reset();
      this.optionsArray.reset();
    }
  }

  sumWeight(): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.questions.map((q) => q.weight).reduce(reducer);
  }

  existOrder(order: number): boolean {
    return this.questions.map((q) => q.order).includes(order);
  }

  removeQuestion(item: QuestionModel): void {
    if (item.id === this.questionId) {
      this.questionItemFormGroup.reset();
      this.optionsArray.reset();
    }
    this.questions = this.questions.filter((q) => q !== item);
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
      optionLabel: new FormControl(''),
      optionValue: new FormControl(''),
      optionWeight: new FormControl(''),
      minRelativeFormControl: new FormControl(''),
      maxRelativeFormControl: new FormControl(''),
    });

    this.optionsArray.push(group);
  }

  removeField(i: number, e: MouseEvent): void {
    e.preventDefault();
    if (this.optionsArray.length > 2) {
      const index = this.optionsArray.removeAt(i);
    }
  }

  optionsWeight(): boolean {
    return this.optionsArray.value.reduce((acc, cur) => acc + cur.optionWeight, 0) === this.requiredWeight;
  }

  optionsRange(): boolean {
    const total =
      this.questionItemFormGroup.controls.maxFormControl.value -
      this.questionItemFormGroup.controls.minFormControl.value;
    let relativeTotal = 0;
    for (const o of this.optionsArray.value) {
      relativeTotal = relativeTotal + (o.maxRelativeFormControl - o.minRelativeFormControl);
    }
    return relativeTotal === total;
  }

  createQuestionItem(questionItem: QuestionModel): void {
    let options: QuestionOption[] = [];
    questionItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
    questionItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
    questionItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
    questionItem.controlType = new ControlTypeModel();
    questionItem.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
    questionItem.controlType = this.controlTypes.find((controlType) => controlType.id === questionItem.controlTypeId);
    questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
    questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

    this.optionsArray.removeAt(this.optionsArray.length);
    if (questionItem.controlType.id !== ControlType.Textbox) {
      for (const o of this.optionsArray.value) {
        const questionOption = new QuestionOption();
        questionOption.label = o.optionLabel;
        questionOption.value = o.optionValue;
        questionOption.weight = o.optionWeight;
        options = [...options, questionOption];
      }
    } else {
      questionItem.min = this.questionItemFormGroup.controls.minFormControl.value;
      questionItem.max = this.questionItemFormGroup.controls.maxFormControl.value;
      for (const o of this.optionsArray.value) {
        const questionOption = new QuestionOption();
        questionOption.minimumRelative = o.minRelativeFormControl;
        questionOption.maximumRelative = o.maxRelativeFormControl;
        questionOption.weight = o.optionWeight;
        options = [...options, questionOption];
      }
    }
    questionItem.options = options;
    this.questions = [...this.questions, questionItem];
  }
}
