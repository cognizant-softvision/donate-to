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
  usersList: UserModel[] = [];
  private isSubmited = false;
  private subscriptions: Subscription[] = [];
  private failedStatus = false;
  searchValue = '';
  visible = false;

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

  ngOnInit(): void {
    this.userSandbox.loadUsers();

    this.subscriptions.push(
      this.userSandbox.users$.subscribe((userList) => {
        this.usersList = userList;
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

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  editUser(user: UserModel) {
    this.popUpModalComponent.ShowModal(user);
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

  associateResult(data: any) {
    this.isSubmited = data;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.usersList = this.usersList.filter((item: UserModel) => item.email.indexOf(this.searchValue) !== -1);
  }
}
