import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { OrganizationSandbox } from '../organization-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css'],
})
export class OrganizationCreateComponent implements OnDestroy {
  // @ViewChild(OrganizationFormComponent)
  private organizationFormComponent: OrganizationFormComponent;
  private subscriptions: Subscription[] = [];

  constructor(public organizationSandbox: OrganizationSandbox, private router: Router) {
    //
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    // this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  goBack() {
    this.router.navigate(['/admin/organization']);
  }
}
