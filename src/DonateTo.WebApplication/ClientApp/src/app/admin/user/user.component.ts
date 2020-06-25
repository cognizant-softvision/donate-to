import { ColumnItem, DataItem, UserModel } from './../../shared/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSandbox } from './user.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  users: UserModel[];
  private subscriptions: Subscription[] = [];
  listOfColumns: ColumnItem[] = [
    {
      name: 'Admin.User.Table.Name',
      sortFn: (a: UserModel, b: UserModel) => a.firstName.localeCompare(b.firstName),
    },
    {
      name: 'Admin.User.Table.Organization',
      sortFn: (a: UserModel, b: UserModel) => a.email.localeCompare(b.email),
    },
    {
      name: 'Admin.User.Table.Email',
      sortFn: (a: UserModel, b: UserModel) => a.email.localeCompare(b.email),
    },
    {
      name: 'Admin.Action',
    },
  ];

  constructor(public userSandbox: UserSandbox, protected router: Router) {}

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.userSandbox.loadUsers();
    console.log(this.userSandbox.users$);
  }

  updateUserOrganization() {
    this.userSandbox.userOrganizationLink(1, [3]);
  }
}
