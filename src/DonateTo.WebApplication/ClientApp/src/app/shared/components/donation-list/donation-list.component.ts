import { Component, OnInit, Input } from '@angular/core';
import { Donation } from 'src/shared/models/Donation';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {

  constructor() { }

  @Input() donations: Donation[] = [];

  ngOnInit() {
  }

}
