import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/models';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  listOfRow: Array<{ row: string; value: string; required: boolean }> = [];
  user = new UserModel();
  isValid = true;

  @ViewChildren('userData') inputs;

  listChangePassword = [
    { row: 'UserProfile.OldPassword', value: '' },
    { row: 'UserProfile.NewPassword', value: '' },
    { row: 'UserProfile.RepeatPassword', value: '' },
  ];

  isEdit = false;
  isEnable = false;

  constructor(public userSandbox: UserSandbox) {}

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  unregisterEvents() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  registerEvents() {
    this.subscriptions.push(
      this.userSandbox.user$.subscribe((user) => {
        this.listOfRow = [
          { row: 'UserProfile.FirstName', value: user.firstName, required: true },
          { row: 'UserProfile.LastName', value: user.lastName, required: true },
          { row: 'UserProfile.IdentityNumber', value: user.identityNumber, required: false },
          { row: 'UserProfile.PhoneNumber', value: user.phoneNumber, required: false },
        ];

        this.user = { ...user };
      })
    );

    this.subscriptions.push(
      this.userSandbox.userId$.subscribe((userId) => {
        if (userId) {
          this.userSandbox.loadUser(userId);
        }
      })
    );
  }

  toggleEdit() {
    this.isEnable = !this.isEnable;
  }

  edit() {
    this.isEdit = true;
  }

  validateForm() {
    for (const i in this.inputs._results) {
      if (this.inputs._results[i].viewModel === '') {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    }
  }

  saveGeneralInformation() {
    this.validateForm();
    if (this.isValid) {
      this.isEdit = false;
      this.user.firstName = this.inputs._results[0].viewModel;
      this.user.lastName = this.inputs._results[1].viewModel;
      this.user.identityNumber = this.inputs._results[2].viewModel;
      this.user.phoneNumber = this.inputs._results[3].viewModel;
      this.userSandbox.updateUser(this.user);
    }
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
