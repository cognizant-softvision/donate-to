import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationsSandbox } from '../donations-sandbox';
import { DonationRequestModel } from 'src/app/shared/models/donation-request.model';
import { DonationFilter } from 'src/app/shared/models/filters/donation-filter';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { NzModalRef, NzModalService, NzTableQueryParams } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { WeekDays } from 'src/app/shared/enum/weekdays';

@Component({
  selector: 'app-donations-detail',
  templateUrl: './donations-detail.component.html',
  styleUrls: ['./donations-detail.component.css'],
})
export class DonationsDetailComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  id: number;
  donationRequest: DonationRequestModel;
  donationsList: DonationModel[] = [];
  donationDetail = new DonationModel();

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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public donationSandbox: DonationsSandbox,
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
        this.donationSandbox.loadDonationRequest(this.id);
        this.donationSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
      })
    );
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
        this.donationRequest = donationRequest;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.donationsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.donationsList = res.results;
      })
    );
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

    this.donationSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
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

    this.donationSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
  }

  resetItemNameSearch(): void {
    this.itemNameVisible = false;
    this.itemNameValue = '';
    this.donationFilter = { ...this.donationFilter, itemName: this.itemNameValue };
    this.donationSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
  }

  searchItemName(): void {
    this.itemNameVisible = false;
    this.donationFilter = { ...this.donationFilter, itemName: this.itemNameValue };
    this.donationSandbox.loadPagedFilteredDonationByDonationRequestId(this.donationFilter);
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
      nzClosable: false,
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '80%',
    });
  }

  dayOfWeekDescription(dayOfWeek: number): string {
    return this.weekDays.find((weekDay) => weekDay.dayOfWeek === dayOfWeek).description;
  }
}
