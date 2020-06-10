import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DonationRequestModel } from 'src/app/shared/models';
import { DonationsFormComponent } from '../donations-form/donations-form.component';
import { DonationsSandbox } from '../donations-sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donations-edit',
  templateUrl: './donations-edit.component.html',
  styleUrls: ['./donations-edit.component.css'],
})
export class DonationsEditComponent implements OnInit, OnDestroy {
  @ViewChild(DonationsFormComponent)
  private donationsFormComponent: DonationsFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
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

  ngOnInit(): void {
    this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
      this.donationRequest = donationRequest;
    });

    this.donationSandbox.loadDonationRequest(this.id);
  }

  validateDonationRequestForm() {
    this.donationsFormComponent.validateForm();
  }

  updateDonationRequest(updatedDonationRequest: DonationRequestModel) {
    this.donationSandbox.updateDonationRequest(updatedDonationRequest);
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
