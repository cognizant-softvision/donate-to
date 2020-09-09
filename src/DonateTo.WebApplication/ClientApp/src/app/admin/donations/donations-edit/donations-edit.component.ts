import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DonationRequestModel } from 'src/app/shared/models';
import { DonationsFormComponent } from '../donations-form/donations-form.component';
import { DonationsSandbox } from '../donations.sandbox';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-donations-edit',
  templateUrl: './donations-edit.component.html',
  styleUrls: ['./donations-edit.component.less'],
})
export class DonationsEditComponent implements OnInit, OnDestroy {
  @ViewChild(DonationsFormComponent)
  private donationsFormComponent: DonationsFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  isErrorModalActive = false;
  donationRequest: DonationRequestModel;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private router: Router, public donationSandbox: DonationsSandbox) {
    this.subscriptions.push(
      this.activeRoute.params.subscribe((param) => {
        this.id = parseInt(param['Id'], 10);
      })
    );

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

  ngOnInit(): void {
    this.subscriptions.push(
      this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
        this.donationRequest = donationRequest;
      })
    );
    this.donationSandbox.loadDonationRequest(this.id);
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

  updateDonationRequest(updatedDonationRequest: DonationRequestModel) {
    this.isSubmited = true;
    this.donationSandbox.updateDonationRequest(updatedDonationRequest);
    this.donationSandbox.loadAction$.pipe(first()).subscribe((_) => this.donationSandbox.loadDonationRequests());
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
