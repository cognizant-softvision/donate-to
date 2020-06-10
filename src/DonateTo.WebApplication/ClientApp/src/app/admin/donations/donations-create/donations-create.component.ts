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
  isErrorModalActive = false;

  constructor(public donationSandbox: DonationsSandbox, private router: Router) {
    this.subscriptions.push(
      this.donationSandbox.loadAction$.subscribe((_) => {
        if (this.donationSandbox.failAction && this.isSubmited) {
          this.switchErrorModal();
        }
        if (this.isSubmited) {
          this.goBack();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  validateDonationRequestForm() {
    this.donationsFormComponent.validateForm();
  }

  createDonationRequest(data: any) {
    this.donationSandbox.createDonationRequest(data);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/admin/donations');
  }

  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
