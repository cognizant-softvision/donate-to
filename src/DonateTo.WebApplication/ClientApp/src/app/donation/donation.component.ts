import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModel } from '../shared/models';
import { DonationListComponent } from './components/donation/list/donation-list.component';
import { DonationItemModel } from '../shared/models/donation-item.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit, OnDestroy {
  constructor(
    protected router: ActivatedRoute,
    public donationSandbox: DonationSandbox,
    protected route: Router,
    private modal: NzModalService,
    public translateService: TranslateService
  ) {}

  donationRequestId: number;

  donationItems: DonationItemModel[] = [];
  isSubmited = false;

  @ViewChild('modalContent') public modalContent: TemplateRef<any>;

  tplModal?: NzModalRef;

  subscriptions: Subscription[] = [];

  donation: DonationRequestModel;

  @ViewChild(DonationListComponent)
  private donationListComponent: DonationListComponent;

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Unsubscribes from events
   */
  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  registerEvents(): void {
    this.subscriptions.push(
      this.router.params.subscribe((params: Params) => {
        this.donationRequestId = params['donationRequestId'];
        this.donationSandbox.loadDonationRequest(params['donationRequestId']);
      })
    );

    this.subscriptions.push(
      this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
        this.donation = donationRequest;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.newDonationLoading$.subscribe((value) => {
        if (!value && this.isSubmited) {
          this.hideModal();
          this.route.navigate(['']);
        }
      })
    );
  }

  submited(value: boolean): void {
    this.isSubmited = value;
  }

  showModal() {
    this.createTplModal(this.modalContent);
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzTitle: this.translateService.instant('RequestDonation.DonationSteps.ConfirmationTitle'),
      nzContent: tplContent,
      nzFooter: null,
      nzClosable: false,
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '80%',
    });
  }

  hideModal() {
    this.tplModal?.destroy();
  }

  showDonationConfirmModal(state: boolean): void {
    if (state) {
      this.donationItems = this.donationListComponent.editCache
        .filter((item) => item.quantityToDonate > 0)
        .map((item) => {
          const donationItem: DonationItemModel = new DonationItemModel();
          donationItem.donationRequestItemId = item.item.id;
          donationItem.donationRequestItem = JSON.parse(JSON.stringify(item.item));
          donationItem.unitId = item.item.unitId;
          donationItem.quantity = item.quantityToDonate;
          return donationItem;
        });
      this.showModal();
    } else {
      this.hideModal();
    }
  }
}
