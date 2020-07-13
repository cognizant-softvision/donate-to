import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsSandbox } from '../questions-sandbox';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css'],
})
export class QuestionsCreateComponent implements OnDestroy {
  @ViewChild(QuestionsFormComponent)
  private questionsFormComponent: QuestionsFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  isErrorModalActive = false;
  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  tplModal?: NzModalRef;
  constructor(public questionSandbox: QuestionsSandbox, private router: Router, private modal: NzModalService) {
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
  submitPriority(priority: number): void {
    this.hideModal();
    // this.questionsFormComponent.donationRequest.priority = priority;
    this.createDonationRequest();
  }
  openDonationPriority(): void {
    // this.questionsFormComponent.validateForm();
    // if (this.questionsFormComponent.donationRequestFormGroup.valid) {
    //   this.showModal();
    // }
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
  createDonationRequest() {
    this.isSubmited = true;
    // this.questionSandbox.createDonationRequest(this.questionsFormComponent.donationRequest);
  }
  goBack() {
    this.router.navigate(['/admin/priority-questions']);
  }
  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
  }
  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
