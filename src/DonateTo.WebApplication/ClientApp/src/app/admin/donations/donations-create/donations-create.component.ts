import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { DonationsFormComponent } from '../donations-form/donations-form.component';
import { DonationsSandbox } from '../donations.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.less'],
})
export class DonationsCreateComponent implements OnDestroy {
  @ViewChild(DonationsFormComponent)
  private donationsFormComponent: DonationsFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  isErrorModalActive = false;

  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  tplModal?: NzModalRef;
  constructor(public donationSandbox: DonationsSandbox, private router: Router, private modal: NzModalService) {
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
        this.showModal();
      }
    }
  }
  submitPriority(value: boolean): void {
    this.hideModal();
    this.goBack();
  }

  openDonationPriority(): void {
    this.donationsFormComponent.validateForm();
    if (this.donationsFormComponent.donationRequestFormGroup.valid) {
      this.donationsFormComponent.donationRequest.priority = 0;
      this.createDonationRequest();
    }
  }

  showModal() {
    this.createTplModal(this.modalContent);
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    if (!this.tplModal) {
      this.tplModal = this.modal.create({
        nzContent: tplContent,
        nzFooter: null,
        nzClosable: true,
        nzTitle: 'Questions',
        nzStyle: {
          top: '2em;',
        },
        nzWidth: '60%',
        nzOnCancel: () => {
          this.isSubmited = false;
          this.switchErrorModal();
          this.goBack();
        },
      });
    }
  }

  hideModal() {
    this.tplModal?.destroy();
  }

  createDonationRequest() {
    this.isSubmited = true;
    this.donationSandbox.createDonationRequest(this.donationsFormComponent.donationRequest);
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
