import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less'],
})
export class MyProfileComponent implements OnInit {
  listOfRow = [
    { row: 'UserProfile.Name', value: 'Charly Brown' },
    { row: 'UserProfile.Phone', value: '5472323456' },
    { row: 'UserProfile.Country', value: 'United State' },
    { row: 'UserProfile.State', value: 'Ohio' },
    { row: 'UserProfile.Apartment', value: 'Columbus' },
    { row: 'UserProfile.Street', value: 'National Rd SE 32' },
    { row: 'UserProfile.PostalCode', value: '4212' },
    { row: 'UserProfile.AdditionalInformation', value: 'N/A' },
  ];

  listChangePassword = [
    { row: 'UserProfile.OldPassword', value: '' },
    { row: 'UserProfile.NewPassword', value: '' },
    { row: 'UserProfile.RepeatPassword', value: '' },
  ];

  isEdit = false;
  isEnable = false;

  constructor() {}

  ngOnInit(): void {}

  toggleEdit() {
    this.isEnable = !this.isEnable;
  }

  edit() {
    this.isEdit = true;
  }
  saveGeneralInformation() {
    this.isEdit = false;
  }

  cancelGeneralInformation() {
    this.isEdit = false;
  }

  cancelPassword() {
    this.listChangePassword = [
      { row: 'UserProfile.OldPassword', value: '' },
      { row: 'UserProfile.NewPassword', value: '' },
      { row: 'UserProfile.RepeatPassword', value: '' },
    ];
  }
  saveNewPassword() {}
}
