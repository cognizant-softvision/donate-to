import { Component, Input, OnInit } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.css'],
})
export class DonationStepFinishComponent implements OnInit {
  @Input() donationItems: DonationItemModel[];

  constructor() {}
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
}
