import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { SearchMenuSandBox } from './search-menu.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.less'],
})
export class SearchMenuComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isAuthenticated = false;
  searchValue: string = null;
  searchLength = 2;
  pageSize = 6;
  currentPage = 1;
  userUrl = '/admin/users';
  organizationUrl = '/admin/organizations';
  donationUrl = '/admin/donations';
  baseUrl = '/';

  constructor(private router: Router, public searchMenuSandbox: SearchMenuSandBox, public userSandbox: UserSandbox) {}

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private registerEvents() {
    this.subscriptions.push(
      this.searchMenuSandbox.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      })
    );
  }

  onChange() {
    const url = this.router.url;
    if (this.searchValue.length >= this.searchLength) {
      switch (url) {
        case this.userUrl:
          this.searchMenuSandbox.loadUsersSearchPaged(this.pageSize, this.currentPage, this.searchValue);
          break;
        case this.organizationUrl:
          this.searchMenuSandbox.loadOrganizationsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
          break;
        case this.baseUrl:
        case this.donationUrl:
          this.searchMenuSandbox.loadDonationRequestsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
          break;
      }
    } else if (this.searchValue.length === 0) {
      this.currentPage = 1;
      switch (url) {
        case this.userUrl:
          this.searchMenuSandbox.loadUsersPaged(this.pageSize, this.currentPage);
          break;
        case this.organizationUrl:
          this.searchMenuSandbox.loadOrganizationsPaged(this.pageSize, this.currentPage);
          break;
        case this.baseUrl:
        case this.donationUrl:
          this.searchMenuSandbox.loadDonationRequestsPaged(this.pageSize, this.currentPage);
          break;
      }
    }
  }
}
