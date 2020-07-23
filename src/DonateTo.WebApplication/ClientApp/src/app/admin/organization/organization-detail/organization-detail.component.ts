import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrganizationModel } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationSandbox } from '../organization-sandbox';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css'],
})
export class OrganizationDetailComponent implements OnInit {
  subscriptions: Subscription[] = [];
  organization: OrganizationModel;
  private failedStatus = false;
  private isSubmited = false;
  isErrorModalActive = false;
  id: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public organizationSandbox: OrganizationSandbox
  ) {
    this.subscriptions.push(
      this.activeRoute.params.subscribe((param) => {
        this.id = parseInt(param['Id'], 10);
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.loadAction$.subscribe((_) => {
        this.handleRequestResult();
      })
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.organizationSandbox.organization$.subscribe((organization) => {
        this.organization = organization;
        console.log('Organization loaded: ', this.organization);
      })
    );

    this.organizationSandbox.loadOrganization(this.id);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (this.failedStatus) {
        this.isSubmited = false;
        this.switchErrorModal();
      } else {
        this.goBack();
      }
    }
  }

  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
  }

  goBack() {
    this.router.navigate(['/admin/organization']);
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
