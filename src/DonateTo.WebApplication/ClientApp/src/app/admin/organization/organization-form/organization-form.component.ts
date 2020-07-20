import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrganizationModel } from 'src/app/shared/models';
import { OrganizationSandbox } from '../organization-sandbox';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
})
export class OrganizationFormComponent implements OnInit {
  @Input() donationRequest: OrganizationModel;
  @Output() validationResult = new EventEmitter<OrganizationModel>();

  constructor(public organizationSandbox: OrganizationSandbox) {}

  ngOnInit(): void {}
}
