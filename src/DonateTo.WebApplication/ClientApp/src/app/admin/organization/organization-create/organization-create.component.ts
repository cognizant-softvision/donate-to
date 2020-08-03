import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { OrganizationSandbox } from '../organization-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizationModel } from 'src/app/shared/models';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.less'],
})
export class OrganizationCreateComponent implements OnDestroy {
  private organizationFormComponent: OrganizationFormComponent;
  private subscriptions: Subscription[] = [];

  organization: OrganizationModel = new OrganizationModel();
  id = 0;

  constructor(public organizationSandbox: OrganizationSandbox, private router: Router) {}

  ngOnDestroy(): void {}

  goBack() {
    this.router.navigate(['/admin/organization']);
  }
}
