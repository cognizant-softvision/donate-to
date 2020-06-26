import { ColumnItem, OrganizationModel, UserModel } from './../../shared/models';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { Subscription } from 'rxjs';
import { UserSandbox } from './user.sandbox';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(PopupModalComponent) private popUpModalComponent: PopupModalComponent;
  user: UserModel;
  private isSubmited = false;
  private subscriptions: Subscription[] = [];
  private failedStatus = false;

  listOfColumns: ColumnItem[] = [
    {
      name: 'Admin.User.Table.Name',
      sortFn: (a: UserModel, b: UserModel) => a.firstName.localeCompare(b.firstName),
    },
    {
      name: 'Admin.User.Table.Organization',
      sortFn: (a: UserModel, b: UserModel) => a.lastName.localeCompare(b.lastName),
    },
    {
      name: 'Admin.User.Table.Email',
      sortFn: (a: UserModel, b: UserModel) => a.email.localeCompare(b.email),
    },
    {
      name: 'Admin.Action',
    },
  ];

  constructor(public userSandbox: UserSandbox) {}

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  editUser(user: UserModel) {
    this.popUpModalComponent.ShowModal(user);
  }

  ngOnInit(): void {
    this.userSandbox.loadUsers();
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

  handleRequestResult() {
    if (this.isSubmited) {
      if (!this.failedStatus) {
        this.userSandbox.loadUsers();
        this.isSubmited = false;
      }
    }
  }

  showOrganizations(organizations: OrganizationModel[]) {
    return organizations.map(({ name }) => name).join(', ');
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  associateResult(data: any) {
    this.isSubmited = data;
  }
}
