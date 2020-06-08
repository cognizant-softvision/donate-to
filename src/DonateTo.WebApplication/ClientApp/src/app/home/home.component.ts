import { Component, OnInit } from '@angular/core';
import { HomeSandbox } from './home.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfigService } from '../app-config.service';
import { fromEvent, Subject } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  param = { value: 'world' };
  modalVisible = false;
  item: any = null;
  searchValue: string = null;

  currentPage = 1;
  pageSize = 6;
  totalItems = 0;

  constructor(public homeSandbox: HomeSandbox, protected router: Router, protected configService: ConfigService) {
    this.pageSize = this.configService.get('pageSize') || this.pageSize;
  }

  subscriptions: Subscription[] = [];
  inputChange = new Subject();

  ngOnInit(): void {}

  onSearch() {
    this.homeSandbox.loadDonationRequestsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
  }

  onChange(e) {
    this.inputChange.next(e);
    const valueSearch$ = fromEvent(e, 'input').pipe(
      map((event) => event.target.value),
      filter((query) => query),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((query) => console.log(`About to make an API call with query: ${query}`))
    );
    this.homeSandbox.loadDonationRequestsSearchPaged(this.pageSize, this.currentPage, this.searchValue);
  }

  showModal(item) {
    this.item = item;
    this.modalVisible = true;
  }

  hideModal() {
    this.item = null;
    this.modalVisible = false;
  }

  goToDonate() {
    this.homeSandbox.login();
  }
}
