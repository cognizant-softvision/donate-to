import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DonationRequestModel, UserModel } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { UserSandbox } from '../user.sandbox';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild(UserFormComponent)
  private userFormComponent: UserFormComponent;
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  isErrorModalActive = false;
  user: UserModel;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private router: Router, public userSandbox: UserSandbox) {
    this.subscriptions.push(
      this.activeRoute.params.subscribe((param) => {
        this.id = parseInt(param['Id'], 10);
      })
    );

    this.subscriptions.push(
      this.userSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.userSandbox.loadAction$.subscribe((_) => {
        this.handleRequestResult();
      })
    );
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userSandbox.user$.subscribe((user) => {
        this.user = user;
      })
    );

    this.userSandbox.loadUser(this.id);
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (this.failedStatus) {
        this.isSubmited = false;
        this.switchErrorModal();
      } else {
        this.goBack();
      }
    }
  }

  validateDonationRequestForm() {
    this.userFormComponent.validateForm();
  }

  updateDonationRequest(user: UserModel) {
    this.isSubmited = true;
    this.userSandbox.updateUser(user);
  }

  goBack() {
    this.router.navigate(['/admin/user']);
  }

  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
