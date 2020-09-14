import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { UserModel } from '../../models';
import { SearchMenuSandBox } from './search-menu.sandbox';
import { HomeSandbox } from 'src/app/home/home.sandbox';

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

  constructor(public searchMenuSandbox: SearchMenuSandBox, public userSandbox: UserSandbox) {}

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
    // Abrir case dependiendo de la ruta donde me encuentro
    if (this.searchValue.length >= this.searchLength) {
      // this.searchMenuSandbox.loadDonationRequestsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
      // this.searchMenuSandbox.loadOrganizationsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
      this.searchMenuSandbox.loadUsersSearchPaged(this.pageSize, this.currentPage, this.searchValue);
    } else if (this.searchValue.length === 0) {
      this.currentPage = 1;
      this.searchMenuSandbox.loadDonationRequestsPaged(this.pageSize, this.currentPage);
      this.searchMenuSandbox.loadOrganizationsPaged(this.pageSize, this.currentPage);
      this.searchMenuSandbox.loadUsersPaged(this.pageSize, this.currentPage);
    }
  }
}
