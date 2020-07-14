import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';
import { QuestionModel } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsSandbox } from '../questions-sandbox';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.css'],
})
export class QuestionsEditComponent implements OnInit, OnDestroy {
  @ViewChild(QuestionsEditComponent)
  private questionsFormComponent: QuestionsFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  isErrorModalActive = false;
  question: QuestionModel;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private router: Router, public questionSandbox: QuestionsSandbox) {
    this.subscriptions.push(
      this.activeRoute.params.subscribe((param) => {
        this.id = parseInt(param['Id'], 10);
      })
    );

    //   this.subscriptions.push(
    //     this.donationSandbox.failAction$.subscribe((status) => {
    //       this.failedStatus = status;
    //     })
    //   );

    //   this.subscriptions.push(
    //     this.donationSandbox.loadAction$.subscribe((_) => {
    //       this.handleRequestResult();
    //     })
    //   );
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  ngOnInit(): void {
    // this.subscriptions.push(
    //   this.questionSandbox.donationRequest$.subscribe((donationRequest) => {
    //     this.questionSandbox = donationRequest;
    //   })
    // );
    // this.questionSandbox.loadDonationRequest(this.id);
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

  validateForm() {
    // this.questionsFormComponent.validateForm();
  }

  updateQuestion(updatedQuestion: QuestionModel) {
    // this.isSubmited = true;
    // this.questionSandbox.updateDonationRequest(updatedQuestion);
    // this.questionSandbox.loadAction$.pipe(first()).subscribe((_) => this.questionSandbox.loadDonationRequests());
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
