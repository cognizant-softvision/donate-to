import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserSandbox } from '../../user.sandbox';
import { UserModel } from '../../../../shared/models';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css'],
})
export class PopupModalComponent implements OnInit {
  @Output() associateResult = new EventEmitter<boolean>();
  user: UserModel;
  isVisible = false;
  selectedOrganizations: number[];

  constructor(public userSandbox: UserSandbox) {}

  ngOnInit(): void {
    this.userSandbox.loadOrganizations();
  }

  ShowModal(user) {
    this.user = user;

    if (this.user.organizations) {
      this.selectedOrganizations = this.user.organizations.map((o) => o.id);
    } else {
      this.selectedOrganizations = [];
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.userSandbox.userOrganizationLink(this.user.id, this.selectedOrganizations);
    this.selectedOrganizations = [];
    this.associateResult.emit(true);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.selectedOrganizations = [];
    this.isVisible = false;
  }
}
