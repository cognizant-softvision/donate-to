import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HomeSandbox } from 'src/app/home/home.sandbox';

@Component({
  selector: 'app-donation-requests-list',
  templateUrl: './donation-requests-list.component.html',
  styleUrls: ['./donation-requests-list.component.css'],
})
export class DonationRequestsListComponent implements OnInit {

  constructor(public homeSandbox: HomeSandbox) {}
  @Input() totalItems = 0;
  @Input() currPage = 1;
  @Input() pageSize = 6;

  gutter = [8, 8];
  headStyle = {
    textAlign: 'left',
  };

  @Output() showModal = new EventEmitter();
  @Output() pageChange = new EventEmitter<number>();

  @Input() donationRequests = [];
  @Input() loading = true;

  dataSource = this.donationRequests;

  onPageChange(page) {
    this.currPage = page;
    this.pageChange.emit(page);
  }

  ngOnInit(): void {
    this.dataSource = this.donationRequests;
  }

  showDetail(id) {
    const item = this.donationRequests.find((i) => i.id === id);
    this.showModal.emit(item);
  }

  onChange(newValue) {
    this.dataSource = newValue;
  }
}
