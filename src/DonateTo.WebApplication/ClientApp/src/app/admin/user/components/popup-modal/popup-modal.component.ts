import { Component, Input, OnInit } from '@angular/core';
import { OrganizationModel, UserModel } from 'src/app/shared/models';
import { UserSandbox } from '../../user.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css'],
})
export class PopupModalComponent implements OnInit {
  user: UserModel;
  isVisible = false;
  selectedOrganizations: OrganizationModel[];
  organizations: OrganizationModel[];

  constructor(public userSandbox: UserSandbox) {}

  ngOnInit(): void {
    this.userSandbox.loadOrganizations();
  }

  ShowModal(user) {
    this.user = user;

    if (this.user.organizations) {
      this.selectedOrganizations = this.user.organizations;
    } else {
      this.selectedOrganizations = [];
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.userSandbox.userOrganizationLink(this.user.id, this.selectedOrganizations);
    this.selectedOrganizations = [];
    this.isVisible = false;
  }

  handleCancel(): void {
    this.selectedOrganizations = [];
    this.isVisible = false;
  }
}
