import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsSandbox } from '../questions-sandbox';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { ControlType, ControlType2LabelMapping } from 'src/app/shared/enum/controlTypes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionOption } from 'src/app/shared/models/question-option.modal';

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
  private failedStatus = false;
  public ControlType2LabelMapping = ControlType2LabelMapping;
  public controlTypes = Object.values(ControlType);

  isErrorModalActive = false;
  tplModal?: NzModalRef;
  public isOption = false;
  form!: FormGroup;
  optionsArray = new FormArray([]);

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
    private router: Router,
    private modal: NzModalService,
    private formBuilder: FormBuilder
  ) {
    // this.subscriptions.push(
    //   this.questionSandbox.failAction$.subscribe((status) => {
    //     this.failedStatus = status;
    //   })
    // );
    // this.subscriptions.push(
    //   this.questionSandbox.loadAction$.subscribe((_) => {
    //     this.handleRequestResult();
    //   })
    // );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
    this.addField();
    this.addField();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (this.failedStatus) {
        this.isSubmited = false;
        this.switchErrorModal();
      } else {
        this.goBack();
      }
    }
  }

  showModal() {
    this.createTplModal(this.modalContent);
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzContent: tplContent,
      nzFooter: null,
      nzClosable: true,
      nzTitle: 'Questions',
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '60%',
    });
  }

  hideModal() {
    this.tplModal?.destroy();
  }

  createQuestions() {
    this.isSubmited = true;
    this.questionSandbox.updateQuestions(this.questions);
  }

  goBack() {
    this.router.navigate(['/admin/priority-questions']);
  }

  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
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

      this.optionsArray.removeAt(this.optionsArray.length);
      for (const o of this.optionsArray.value) {
        const questionOption = new QuestionOption();
        questionOption.label = o.optionLabel;
        questionOption.value = o.optionValue;
        questionOption.weight = o.optionWeight;
        options = [...options, questionOption];
      }
      questionItem.options = options;

      if (questionItem.controlType !== ControlType.Textbox) {
        if (this.optionsWeight(questionItem.options) !== true) {
          this.modal.error({
            nzTitle: 'Warning',
            nzContent: 'The weight of each option must sum a total of 100',
          });
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
    const totalWeight = options.reduce((acc, cur) => acc + cur.weight, 0);

    if (totalWeight !== 100) {
      return false;
    }

    return true;
  }
}
