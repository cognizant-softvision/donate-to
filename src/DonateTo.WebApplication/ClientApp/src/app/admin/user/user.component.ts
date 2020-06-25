import { ColumnItem, UserModel } from './../../shared/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserSandbox } from './user.sandbox';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
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
      sortFn: (a: UserModel, b: UserModel) => a.email.localeCompare(b.email),
    },
    {
      name: 'Admin.Action',
    },
  ];

  editUser(user: UserModel) {
    this.popUpModalComponent.ShowModal(user);
  }

  ngOnInit(): void {
    this.userSandbox.loadUsers();
  }
}
