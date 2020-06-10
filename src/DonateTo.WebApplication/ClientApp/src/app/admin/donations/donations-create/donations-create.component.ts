import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DonationsFormComponent } from '../donations-form/donations-form.component';
import { DonationsSandbox } from '../donations-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent implements OnDestroy {
  @ViewChild(DonationsFormComponent)
  private donationsFormComponent: DonationsFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  isErrorModalActive = false;

  constructor(public donationSandbox: DonationsSandbox, private router: Router) {
    this.subscriptions.push(
      this.donationSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.loadAction$.subscribe((_) => {
        this.handleRequestResult();
      })
    );
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

  validateDonationRequestForm() {
    this.donationsFormComponent.validateForm();
  }

  createDonationRequest(data: any) {
    this.isSubmited = true;
    this.donationSandbox.createDonationRequest(data);
  }

  goBack() {
    this.router.navigate(['/admin/donations']);
  }

  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
