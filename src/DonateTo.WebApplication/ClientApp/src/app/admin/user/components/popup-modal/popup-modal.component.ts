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
  @Input() user: UserModel;
  isVisible = false;
  selectedOrganizations: number[];
  organizations: OrganizationModel[];
  subscriptions: Subscription[] = [];

  constructor(public userSandbox: UserSandbox) {}

  ngOnInit(): void {
    this.userSandbox.loadOrganizations();
  }

  ShowModal() {
    if (this.user.organizations) {
      this.selectedOrganizations = this.user.organizations.map((o) => o.id);
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.userSandbox.userOrganizationLink(this.user.id, this.selectedOrganizations);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
