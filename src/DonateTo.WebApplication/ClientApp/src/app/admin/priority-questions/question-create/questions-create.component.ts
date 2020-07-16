import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsSandbox } from '../questions-sandbox';
import { Subscription } from 'rxjs';
import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlTypeModel } from 'src/app/shared/models/control-type.model';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css'],
})
export class QuestionsCreateComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  questions: QuestionModel[] = [];

  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  private controlTypes: ControlTypeModel[] = [];

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

  constructor(public questionSandbox: QuestionsSandbox, private router: Router) {}

  ngOnInit(): void {
    this.questionSandbox.loadControlTypes();
    this.questionSandbox.loadQuestions();
    this.registerEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.questionSandbox.controlTypes$.subscribe((controlTypes) => (this.controlTypes = controlTypes))
    );

    this.subscriptions.push(this.questionSandbox.questions$.subscribe((questions) => (this.questions = questions)));
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (this.failedStatus) {
        this.isSubmited = false;
      } else {
        this.goBack();
      }
    }
  }

  createQuestions() {
    this.isSubmited = true;
    this.questions.forEach((question) => {
      question.controlType = undefined;
    });
    this.questionSandbox.updateQuestions(this.questions);
  }

  goBack() {
    this.router.navigate(['/admin/priority-questions']);
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
      questionItem.controlType = new ControlTypeModel();
      questionItem.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
      questionItem.controlType = this.controlTypes.find(
        (controlType) => controlType.id === questionItem.controlTypeId
      )[0];
      questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
      questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

      this.questions = [...this.questions, questionItem];
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
}
