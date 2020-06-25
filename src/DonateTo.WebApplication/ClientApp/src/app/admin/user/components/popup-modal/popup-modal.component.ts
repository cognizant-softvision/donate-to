import { Component, Input, OnInit } from '@angular/core';
import { OrganizationModel, UserModel } from 'src/app/shared/models';
import { UserSandbox } from '../../user.sandbox';

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

  constructor(public userSandbox: UserSandbox) {}

  ngOnInit(): void {
    this.userSandbox.loadOrganizations();
  }

  ShowModal() {
    // tiene que obtener los ids del userorganizations userorganization.organizaitonid.
    // this.selectedOrganizations = this.user.userOrganizations.select(organizitonDId);
    this.isVisible = true;
  }
  handleOk(): void {
    this.userSandbox.userOrganizationLink(this.user.id, this.selectedOrganizations);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
