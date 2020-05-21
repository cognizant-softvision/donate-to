import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent implements OnInit {
  donationRequestFormGroup = new FormGroup({});

  constructor() {}

  ngOnInit(): void {}

  CreateDonationRequest() {}
}
