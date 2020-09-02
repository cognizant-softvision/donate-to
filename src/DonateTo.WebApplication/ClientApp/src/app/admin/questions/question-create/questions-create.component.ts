import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsSandbox } from '../questions.sandbox';
import { NzModalRef } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionOption } from 'src/app/shared/models/question-option.modal';
import { ControlTypeModel } from 'src/app/shared/models/control-type.model';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { ControlType } from 'src/app/shared/enum/controlTypes';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.less'],
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
  questionsToDelete = [];
  questionsToDeleteEmpty = true;

  label = '';
  placeholder = '';
  weight = null;
  order = null;
  defaultValue = '';
  controlTypeId = null;
  questionId = 0;
  editedQuestion: QuestionModel = null;
  isEdit = false;
  isQuestionsValid = true;
  isWeightValid = true;
  isRangeValid = true;
  textboxQuestionOptionValid = true;
  questionOptionValid = true;
  minValueEqualsMaxValue = false;
  orderExist = false;
  requiredWeight = 100;

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Questions.Table.Label' },
    { name: 'Admin.Questions.Table.Placeholder' },
    { name: 'Admin.Questions.Table.Order' },
    { name: 'Admin.Questions.Table.Weight' },
    { name: 'Admin.Questions.Table.ControlType' },
    { name: 'Admin.Questions.Table.DefaultValue' },
    { name: 'Admin.Questions.Table.Options' },
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

  updateQuestion() {
    this.validateFormGroup(this.questionItemFormGroup);
    if (this.questionItemFormGroup.valid && this.validateOptions() && !this.existOrder()) {
      if (this.isEdit) {
        this.questions = this.questions.filter((q) => q !== this.editedQuestion);
        this.putQuestion(this.editedQuestion);
      } else {
        this.createQuestion();
      }
      this.resetForm();
    }
  }

  private putQuestion(updatedQuestion: QuestionModel) {
    this.gatherQuestionFormInput(updatedQuestion);
    this.gatherQuestionOptionsFormInput(updatedQuestion);
    this.questions = [...this.questions, updatedQuestion];
  }

  private createQuestion(): void {
    const addedQuestion = new QuestionModel();
    this.gatherQuestionFormInput(addedQuestion);
    this.gatherQuestionOptionsFormInput(addedQuestion);
    this.questions = [...this.questions, addedQuestion];
  }

  private gatherQuestionFormInput(question: QuestionModel) {
    question.label = this.questionItemFormGroup.controls.labelFormControl.value;
    question.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
    question.order = this.questionItemFormGroup.controls.orderFormControl.value;
    question.controlType = new ControlTypeModel();
    question.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
    question.controlType = this.controlTypes.find((controlType) => controlType.id === question.controlTypeId);
    question.weight = this.questionItemFormGroup.controls.weightFormControl.value;
    question.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;
  }

  private gatherQuestionOptionsFormInput(question: QuestionModel) {
    let options: QuestionOption[] = [];

    this.optionsArray.removeAt(this.optionsArray.length);
    if (question.controlType.id !== ControlType.Textbox) {
      for (const o of this.optionsArray.value) {
        const questionOption = new QuestionOption();
        if (this.isEdit) {
          questionOption.id = o.optionId;
        }
        questionOption.label = o.optionLabel;
        questionOption.value = o.optionValue;
        questionOption.weight = o.optionWeight;
        options = [...options, questionOption];
      }
    } else {
      question.min = this.questionItemFormGroup.controls.minFormControl.value;
      question.max = this.questionItemFormGroup.controls.maxFormControl.value;
      for (const o of this.optionsArray.value) {
        const questionOption = new QuestionOption();
        if (this.isEdit) {
          questionOption.id = o.optionId;
        }
        questionOption.minimumRelative = o.minRelativeFormControl;
        questionOption.maximumRelative = o.maxRelativeFormControl;
        questionOption.weight = o.optionWeight;
        options = [...options, questionOption];
      }
    }

    question.options = options;
  }

  submitQuestions() {
    this.isSubmited = true;
    this.validateQuestions();
    if (this.isQuestionsValid) {
      this.questions.forEach((question) => {
        question.controlType = undefined;
      });

      if (!this.questionsToDeleteEmpty) {
        this.questionsToDelete.forEach((item) => {
          this.questionSandbox.deleteQuestion(item);
        });
      }

      this.questionSandbox.updateQuestions(this.questions);

      this.dataUpdated.changeMessage(true);
    }
  }

  private validateQuestions() {
    this.isQuestionsValid = this.questions.length > 0 && this.sumWeight() === this.requiredWeight;
  }

  private validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  private existOrder(): boolean {
    const order = this.questionItemFormGroup.controls.orderFormControl.value;
    this.orderExist = order !== this.editedQuestion?.order && this.questions.map((q) => q.order).includes(order);
    return this.orderExist;
  }

  editQuestion(question: QuestionModel) {
    this.editedQuestion = question;
    this.label = question.label;
    this.placeholder = question.placeholder;
    this.weight = question.weight;
    this.order = question.order;
    this.defaultValue = question.defaultValue;
    this.controlTypeId = question.controlTypeId;
    this.optionsArray = new FormArray([]);
    this.isEdit = true;

    for (const option of question.options) {
      this.addEditField(option);
    }
  }

  /**
   * Removes a Question from the list
   * @param item: QuestionModel
   */
  removeQuestion(item: QuestionModel): void {
    if (item.id === this.questionId) {
      this.resetForm();
    } else {
      this.questionsToDelete.push(item);
      this.questionsToDeleteEmpty = true;
      this.resetForm();
    }
    this.questions = this.questions.filter((q) => q !== item);
  }

  /**
   * Adds a question option field
   * @param e: MouseEvent
   */
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

  addEditField(option: QuestionOption) {
    const group = new FormGroup({
      optionId: new FormControl(option.id),
      optionLabel: new FormControl(option.label),
      optionValue: new FormControl(option.value),
      optionWeight: new FormControl(option.weight),
      minRelativeFormControl: new FormControl(option.minimumRelative),
      maxRelativeFormControl: new FormControl(option.maximumRelative),
    });

    this.optionsArray.push(group);
  }

  /**
   * Removes a question option field
   * @param i: number
   * @param e: MouseEvent
   */
  removeField(i: number, e: MouseEvent): void {
    e.preventDefault();
    if (this.optionsArray.length > 2) {
      this.optionsArray.removeAt(i);
    }
  }

  resetForm() {
    this.questionItemFormGroup.reset();
    this.optionsArray.reset();
    this.isEdit = false;
    this.editedQuestion = null;
  }

  /**
   * Validates the questions entered have a total weight of 100
   * @returns boolean
   */
  private sumWeight(): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.questions.map((q) => q.weight).reduce(reducer);
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  validateOptions(): boolean {
    this.isWeightValid = this.optionsWeight();

    if (this.questionItemFormGroup.value.controlTypeFormControl === ControlType.Textbox) {
      this.isRangeValid = this.optionsRange();
      this.textboxQuestionOptionValid = this.textboxQuestionOptionValidation();
      return this.isWeightValid && this.isRangeValid && this.textboxQuestionOptionValid;
    } else {
      return this.isWeightValid;
    }
  }

  /**
   * Validates the question options entered have a total weight of 100
   * @returns boolean
   */
  private optionsWeight(): boolean {
    return this.optionsArray.value.reduce((acc, cur) => acc + cur.optionWeight, 0) === this.requiredWeight;
  }

  /**
   * Validates the options entered for a Question Number, covers full range.
   * @returns boolean
   */
  private optionsRange(): boolean {
    const total = this.questionItemFormGroup.controls.maxFormControl.value;
    let relativeTotal = 0;
    for (const o of this.optionsArray.value) {
      relativeTotal = relativeTotal + (o.maxRelativeFormControl - o.minRelativeFormControl) + 1;
    }
    return relativeTotal === total;
  }

  /**
   * Validates the questions options added for a textbox
   * @returns boolean
   */
  private textboxQuestionOptionValidation(): boolean {
    return this.textboxQuestionOption() && this.textboxQuestionsOptions();
  }

  /**
   * Validates in a same question option that the max relative value is greater or different than the min relative value
   * @returns boolean
   */
  private textboxQuestionOption(): boolean {
    const questionOptions = this.optionsArray.value;
    let result = true; // returning something inside forEach doesn't break the loop

    questionOptions.forEach((questionOption) => {
      if (questionOption.maxRelativeFormControl <= questionOption.minRelativeFormControl) {
        result = false;
      }
    });

    this.minValueEqualsMaxValue = !result;
    return result;
  }

  /**
   * Validates in list of question options that:
   *  - a minimun value from an option must not be equal to a maximun of another option
   * @returns boolean
   */
  private textboxQuestionsOptions(): boolean {
    const questionOptions = this.optionsArray.value;
    let result = true; // returning something inside forEach doesn't break the loop

    questionOptions.forEach((questionOption) => {
      questionOptions.forEach((maxValue) => {
        if (questionOption.minRelativeFormControl === maxValue.maxRelativeFormControl) {
          console.log(questionOption.minRelativeFormControl, maxValue.maxRelativeFormControl);
          result = false;
        }
      });
    });

    result ? (this.minValueEqualsMaxValue = false) : (this.minValueEqualsMaxValue = true);
    return result;
  }

  goBack() {
    this.router.navigate(['/admin/questions']);
  }
}
