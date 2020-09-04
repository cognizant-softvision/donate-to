import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/models';
import { Router } from '@angular/router';

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

  isEdit = false;
  isEnable = false;

  constructor(public userSandbox: UserSandbox, public router: Router) {}

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

    this.subscriptions.push(
      this.userSandbox.isRoleProcessed$.subscribe((isRoleProcessed) => {
        if (isRoleProcessed && !this.userSandbox.isDonor$.value) {
          this.router.navigate(['']);
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
    this.isValid = true;
    this.inputs._results.forEach((result) => {
      this.isValid = this.isValid && result.viewModel;
    });
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

  changePassword(): void {
    this.userSandbox.forgotPassword();
  }
}
