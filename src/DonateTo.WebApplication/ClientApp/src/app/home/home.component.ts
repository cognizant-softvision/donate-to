import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeSandbox } from './home.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfigService } from '../app-config.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
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
  searchLength = 2;

  constructor(
    public homeSandbox: HomeSandbox,
    protected router: Router,
    protected configService: ConfigService,
    private modal: NzModalService
  ) {
    this.pageSize = this.configService.get('pageSize') || this.pageSize;
  }

  subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  onChange() {
    if (this.searchValue.length >= this.searchLength) {
      this.homeSandbox.loadDonationRequestsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
    } else if (this.searchValue.length === 0) {
      this.currentPage = 1;
      this.homeSandbox.loadDonationRequestsPaged(this.pageSize, this.currentPage);
    }
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
    const path = 'donation';
    if (this.homeSandbox.isAuthenticated) {
      this.hideModal();
      this.router.navigate([path, donationRequestId]);
    } else {
      this.homeSandbox.login(path.concat('/').concat(donationRequestId));
    }
  }
}
