import { Component, Input, OnInit } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.css'],
})
export class DonationStepFinishComponent implements OnInit {
  @Input() donationItems: DonationItemModel[];

  constructor(public donationSandbox: DonationSandbox) {}
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}
