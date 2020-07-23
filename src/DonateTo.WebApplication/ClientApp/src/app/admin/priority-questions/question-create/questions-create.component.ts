import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsSandbox } from '../questions-sandbox';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { ControlType2LabelMapping } from 'src/app/shared/enum/controlTypes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionOption } from 'src/app/shared/models/question-option.modal';
import { ControlTypeModel } from 'src/app/shared/models/control-type.model';

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
  public ControlType2LabelMapping = ControlType2LabelMapping;
  private controlTypes: ControlTypeModel[] = [];

  isErrorModalActive = false;
  tplModal?: NzModalRef;
  public isOption = false;
  form!: FormGroup;
  optionsArray = new FormArray([]);

  label = '';
  placeholder = '';
  weight = 0;
  order = 0;
  defaultValue = '';
  controlTypeId = 0;
  questionId = 0;
  isEdit = false;
  requiredWeight = 100;

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.PriorityQuestion.Table.LabelColumn' },
    { name: 'Admin.PriorityQuestion.Table.PlaceholderColumn' },
    { name: 'Admin.PriorityQuestion.Table.OrderColumnColumn' },
    { name: 'Admin.PriorityQuestion.Table.WeightColumn' },
    { name: 'Admin.PriorityQuestion.Table.ControlTypeColumn' },
    { name: 'Admin.PriorityQuestion.Table.DefaultValueColumn' },
    { name: 'Admin.PriorityQuestion.Table.OptionsColumn' },
    { name: 'Admin.Action' },
  ];

  questionItemFormGroup = new FormGroup({
    labelFormControl: new FormControl('', Validators.required),
    placeholderFormControl: new FormControl('', Validators.required),
    weightFormControl: new FormControl('', Validators.required),
    orderFormControl: new FormControl('', Validators.required),
    controlTypeFormControl: new FormControl('', Validators.required),
    defaultValueFormControl: new FormControl(''),
  });

  constructor(
    public questionSandbox: QuestionsSandbox,
    private router: Router,
    private modal: NzModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionSandbox.loadControlTypes();
    this.questionSandbox.loadQuestions();
    this.registerEvents();
    this.form = this.formBuilder.group({});
    this.addField();
    this.addField();
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

  resetForm(): void {
    this.label = undefined;
    this.placeholder = undefined;
    this.weight = undefined;
    this.order = undefined;
    this.defaultValue = undefined;
    this.controlTypeId = undefined;
    this.questionId = 0;
    this.isEdit = false;
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
    if (this.validateQuestions()) {
      this.questions.forEach((question) => {
        question.controlType = undefined;
      });
      this.questionSandbox.updateQuestions(this.questions);
    }
  }

  validateQuestions() {
    const IsValid = this.questions.length > 0 && this.sumWeight() === this.requiredWeight;
    if (!IsValid) {
      document.getElementById('weightError').hidden = false;
    } else {
      document.getElementById('weightError').hidden = true;
    }
    return IsValid;
  }

  goBack() {
    this.router.navigate(['/admin/priority-questions']);
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
    this.validateFormGroup(this.questionItemFormGroup, this.form);
    if (this.questionItemFormGroup.valid) {
      const questionItem = new QuestionModel();
      let options: QuestionOption[] = [];

      if (this.isEdit) {
        const questionSavedItem = this.questions.find((q) => q.id === this.questionId);
        questionSavedItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
        questionSavedItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
        questionSavedItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
        questionSavedItem.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
        questionSavedItem.controlType = this.controlTypes.find(
          (controlType) => controlType.id === questionSavedItem.controlTypeId
        );
        questionSavedItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
        questionSavedItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

        if (questionSavedItem.controlType.name !== 'Textbox') {
          this.optionsArray.removeAt(this.optionsArray.length);
          for (const o of this.optionsArray.value) {
            const questionOption = new QuestionOption();
            questionOption.label = o.optionLabel;
            questionOption.value = o.optionValue;
            questionOption.weight = o.optionWeight;
            options = [...options, questionOption];
          }
          questionSavedItem.options = options;

          if (this.optionsWeight(questionSavedItem.options) !== true) {
            this.modal.error({
              nzTitle: 'Warning',
              nzContent: 'The weight of each option must sum a total of 100',
            });
          }
        }

        questionItem.id = questionSavedItem.id;
        questionItem.key = questionSavedItem.key;
        questionItem.createdBy = questionSavedItem.createdBy;
        questionItem.createdDate = questionSavedItem.createdDate;
        questionItem.updateBy = questionSavedItem.updateBy;
        questionItem.updateDate = questionSavedItem.updateDate;

        this.resetForm();
      } else {
        questionItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
        questionItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
        questionItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
        questionItem.controlType = new ControlTypeModel();
        questionItem.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
        questionItem.controlType = this.controlTypes.find(
          (controlType) => controlType.id === questionItem.controlTypeId
        );
        questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
        questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

        if (questionItem.controlType.name !== 'Textbox') {
          this.optionsArray.removeAt(this.optionsArray.length);
          for (const o of this.optionsArray.value) {
            const questionOption = new QuestionOption();
            questionOption.label = o.optionLabel;
            questionOption.value = o.optionValue;
            questionOption.weight = o.optionWeight;
            options = [...options, questionOption];
          }
          questionItem.options = options;

          if (this.optionsWeight(questionItem.options) !== true) {
            this.modal.error({
              nzTitle: 'Warning',
              nzContent: 'The weight of each option must sum a total of 100',
            });
          } else {
            this.questions = [...this.questions, questionItem];
          }
        } else {
          this.questions = [...this.questions, questionItem];
        }
      }
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
    });

    this.optionsArray.push(group);
  }

  removeField(i: number, e: MouseEvent): void {
    e.preventDefault();
    if (this.optionsArray.length > 2) {
      const index = this.optionsArray.removeAt(i);
    }
  }

  optionsWeight(options: QuestionOption[]): boolean {
    return options.reduce((acc, cur) => acc + cur.weight, 0) === this.requiredWeight;
  }
}
