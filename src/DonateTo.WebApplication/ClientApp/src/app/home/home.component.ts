import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeSandbox } from './home.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfigService } from '../app-config.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  param = { value: 'world' };
  requests: any[];

  tplModal?: NzModalRef;
  item: any = null;

  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  @ViewChild('modalFooter') public modalFooter: TemplateRef<any>;

  searchValue: string = null;

  currentPage = 1;
  pageSize = 6;
  totalItems = 0;

  constructor(
    public homeSandbox: HomeSandbox,
    protected router: Router,
    protected configService: ConfigService,
    private modal: NzModalService
  ) {
    this.pageSize = this.configService.get('pageSize') || this.pageSize;
  }

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.homeSandbox.donationRequestsPaged$.subscribe((paged) => {
      this.refreshPagedItems(paged);
    });
    this.homeSandbox.donationRequestsSearchPaged$.subscribe((paged) => {
      this.refreshPagedItems(paged);
    });

    this.pageChange({ pageNumber: 1 });
  }

  refreshPagedItems(pagedItems) {
    this.requests = pagedItems.results;
    this.totalItems = pagedItems.rowCount;
  }

  onPageChange(pageNumber: any) {
    this.pageChange({ pageNumber });
  }

  pageChange({ pageSize = this.pageSize, pageNumber }) {
    this.pageSize = pageSize;
    this.currentPage = pageNumber;

    if (!this.searchValue) {
      this.homeSandbox.loadDonationRequestsPaged(pageSize, pageNumber);
    } else {
      this.homeSandbox.loadDonationRequestsSearchPaged(pageSize, pageNumber, this.searchValue);
    }
  }

  onSearch() {
    this.pageChange({ pageNumber: 1 });
  }

  showModal(item: any) {
    this.item = item;
    this.createTplModal(this.modalContent, this.modalFooter);
  }

  hideModal() {
    this.item = null;
    this.tplModal?.destroy();
  }

  createTplModal(tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzStyle: {
        top: '2em;',
      },
      nzWidth: '80%',
    });
  }

  goToDonate(donationRequestId: any) {
    this.hideModal();
    this.router.navigate(['donation', donationRequestId]);
    // if (this.homeSandbox.isAuthenticated) {
    //   this.hideModal();
    //   this.router.navigate(['donation', donationRequestId]);
    // } else {
    //   this.homeSandbox.login();
    // }
  }
}
