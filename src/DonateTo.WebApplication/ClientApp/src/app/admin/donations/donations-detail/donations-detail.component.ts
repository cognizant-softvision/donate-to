import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationsSandbox } from '../donations.sandbox';
import { DonationRequestModel } from 'src/app/shared/models/donation-request.model';
import { DonationFilter } from 'src/app/shared/models/filters/donation-filter';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { NzModalRef, NzModalService, NzTableQueryParams } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { WeekDays } from 'src/app/shared/enum/weekdays';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';

@Component({
  selector: 'app-donations-detail',
  templateUrl: './donations-detail.component.html',
  styleUrls: ['./donations-detail.component.less'],
})
export class DonationsDetailComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  id: number;
  donationRequest: DonationRequestModel;
  donationsList: DonationModel[] = [];
  donationDetail = new DonationModel();
  itemDetail = new DonationItemModel();
  idModifyStatus: number;
  isLoading = false;
  isItem = false;

  donationFilter = new DonationFilter();
  total = 0;
  pageSize = 10;
  pageIndex = 1;

  expandSet = new Set<number>();

  itemNameValue = '';
  itemNameVisible = false;

  weekDays = [
    { dayOfWeek: WeekDays.Monday, description: this.translateService.instant('WeekDays.Monday') },
    { dayOfWeek: WeekDays.Tuesday, description: this.translateService.instant('WeekDays.Tuesday') },
    { dayOfWeek: WeekDays.Wednesday, description: this.translateService.instant('WeekDays.Wednesday') },
    { dayOfWeek: WeekDays.Thursday, description: this.translateService.instant('WeekDays.Thursday') },
    { dayOfWeek: WeekDays.Friday, description: this.translateService.instant('WeekDays.Friday') },
  ];

  tplModal?: NzModalRef;
  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  @ViewChild('modalStatusContent') public modalStatusContent: TemplateRef<any>;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public donationRequestSandbox: DonationsSandbox,
    public donationSandbox: DonationSandbox,
    private modal: NzModalService,
    private translateService: TranslateService
  ) {
    this.donationFilter = {
      ...this.donationFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
    };

    this.subscriptions.push(
      this.activeRoute.params.subscribe((param) => {
        this.id = parseInt(param['Id'], 10);
        this.donationFilter.donationRequestId = this.id;
        this.donationRequestSandbox.loadDonationRequest(this.id);
        this.donationRequestSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
      })
    );
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.donationRequestSandbox.donationRequest$.subscribe((donationRequest) => {
        this.donationRequest = donationRequest;
      })
    );

    this.subscriptions.push(
      this.donationRequestSandbox.donationsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.donationsList = res.results;
      })
    );

    this.donationRequestSandbox.loadStatus();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  unregisterEvents(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  reset(): void {
    this.itemNameValue = '';
    this.donationFilter = {
      ...this.donationFilter,
      itemName: this.itemNameValue,
    };

    this.donationRequestSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.donationFilter = {
      ...this.donationFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.donationRequestSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
  }

  resetItemNameSearch(): void {
    this.itemNameVisible = false;
    this.itemNameValue = '';
    this.donationFilter = { ...this.donationFilter, itemName: this.itemNameValue };
    this.donationRequestSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
  }

  searchItemName(): void {
    this.itemNameVisible = false;
    this.donationFilter = { ...this.donationFilter, itemName: this.itemNameValue };
    this.donationRequestSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
  }

  goBack(): void {
    this.router.navigate(['/admin/donations']);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  showDetails(donationId: number): void {
    this.donationDetail = this.donationsList.find((d) => d.id === donationId);
    this.createTplModal(this.modalContent);
  }

  createTplModal(tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzTitle: this.translateService.instant('Admin.Donation.Detail.MoreInformationTitle'),
      nzContent: tplContent,
      nzFooter: null,
      nzClosable: true,
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '80%',
    });
  }

  createStatusModal(tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzTitle: this.translateService.instant('Admin.Donation.Detail.ChangeStatusTitle'),
      nzContent: tplContent,
      nzFooter: null,
      nzClosable: true,
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '25%',
    });
  }

  changeDonationStatus(donationId: number) {
    this.donationDetail = this.donationsList.find((d) => d.id === donationId);
    this.createStatusModal(this.modalStatusContent);
  }

  changeItemStatus(donationId: number, donationItem: number) {
    this.donationDetail = this.donationsList.find((d) => d.id === donationId);
    this.itemDetail = this.donationDetail.donationItems.find((i) => i.id === donationItem);
    this.isItem = true;
    this.createStatusModal(this.modalStatusContent);
  }

  saveStatus(donationId: number, newStatusId: any) {
    this.donationDetail = this.donationsList.find((d) => d.id === donationId);

    this.isLoading = true;
    const updatedDonation = this.updateDonation(newStatusId);
    this.donationSandbox.updateDonation(updatedDonation);
    this.isItem = false;

    this.subscriptions.push(
      this.donationSandbox.donationsLoading$.subscribe((loading) => {
        if (!loading && this.isLoading) {
          this.isLoading = false;
          this.donationRequestSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
        }
      })
    );
  }

  updateDonation(newStatusId: number): DonationModel {
    const donation = new DonationModel();
    Object.entries(this.donationDetail).forEach((kv) => {
      if (['string', 'number', 'Date'].includes(typeof kv[1])) {
        donation[kv[0]] = kv[1];
      }
    });
    donation.id = this.donationDetail.id;
    donation.observation = this.donationDetail.observation;
    donation.donationRequestId = this.donationDetail.donationRequest.id;
    donation.addressId = this.donationDetail.addressId;
    donation.donationItems = this.donationDetail.donationItems.map((item) => {
      const donationItem: DonationItemModel = new DonationItemModel();
      Object.assign(donationItem, item);
      donationItem.status = undefined;
      donationItem.donation = undefined;
      donationItem.unit = undefined;
      return donationItem;
    });
    if (this.isItem) {
      donation.statusId = this.donationDetail.statusId;
      donation.donationItems.find((item) => item.id === this.itemDetail.id).statusId = this.idModifyStatus;
    } else {
      donation.statusId = newStatusId;
    }
    return donation;
  }

  dayOfWeekDescription(dayOfWeek: number): string {
    return this.weekDays.find((weekDay) => weekDay.dayOfWeek === dayOfWeek).description;
  }
}
