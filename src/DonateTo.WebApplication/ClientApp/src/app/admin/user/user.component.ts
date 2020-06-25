import { ColumnItem, DataItem, UserModel } from './../../shared/models';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserSandbox } from './user.sandbox';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(PopupModalComponent) private popUpModalComponent: PopupModalComponent;
  user: UserModel;

  constructor(public userSandbox: UserSandbox) {}

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
      sortFn: (a: UserModel, b: UserModel) => a.email.length - b.email.length,
    },
    {
      name: 'Admin.Action',
    },
  ];

  editUser(user: UserModel) {
    this.user = user;
    this.popUpModalComponent.ShowModal();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.userSandbox.loadUsers();
    this.registerEvents();
  }

  /**
   * Subscribes to events
   */
  registerEvents(): void {}

  updateUserOrganization() {
    this.userSandbox.userOrganizationLink(1, [3]);
  }
}
