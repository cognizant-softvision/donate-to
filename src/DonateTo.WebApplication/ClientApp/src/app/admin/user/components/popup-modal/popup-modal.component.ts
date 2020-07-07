import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserSandbox } from '../../user.sandbox';
import { UserModel } from '../../../../shared/models';
import { NzModalService } from 'ng-zorro-antd';

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
  previousLinkedOrganizations: number;
  linkedOrganizations: number;

  constructor(public userSandbox: UserSandbox, private modal: NzModalService) {}

  ngOnInit(): void {
    this.userSandbox.loadOrganizations();
  }

  ShowModal(user) {
    this.user = user;

    if (this.user.organizations) {
      this.selectedOrganizations = this.user.organizations.map((o) => o.id);
      this.linkedOrganizations = this.selectedOrganizations.length;
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

  noChanges() {
    this.ShowModal(this.user);
  }

  confirmRemove(): void {
    const selectedOrganization = this.selectedOrganizations[this.selectedOrganizations.length - 1];

    if (this.linkedOrganizations !== this.selectedOrganizations.length) {
      this.previousLinkedOrganizations = this.linkedOrganizations;
      this.linkedOrganizations = this.selectedOrganizations.length;
    }

    if (this.linkedOrganizations < this.previousLinkedOrganizations) {
      this.showDeleteConfirm();
    }
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Organization?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzCancelText: 'No',
      nzOnCancel: () => {
        this.noChanges();
      },
    });
  }
}
