import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { OrganizationFilter } from '../../shared/models/filters/organization-filter';
import { OrganizationModel } from './../../shared/models';
import { OrganizationSandbox } from './organization-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataUpdatedService } from '../../shared/async-services/data-updated.service';

@Component({
  selector: 'app-organization-admin',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less'],
})
export class OrganizationComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  organizationList: OrganizationModel[] = [];
  organizationFilter: OrganizationFilter;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchNameValue = '';
  searchDescriptionValue = '';
  searchContactNameValue = '';
  nameVisible = false;
  descriptionVisible = false;
  contactNameVisible = false;
  failedStatus = false;
  successStatus = false;
  dataSaved = false;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userId: number;
  validOrganizations: OrganizationModel[] = [];

  constructor(
    private organizationSandbox: OrganizationSandbox,
    public router: Router,
    private dataUpdated: DataUpdatedService
  ) {
    this.registerEvents();
  }

  ngOnInit(): void {
    this.organizationFilter = {
      ...this.organizationFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      userId: this.userId,
    };

    if (this.dataSaved) {
      this.dataUpdated.changeMessage(false);
      window.location.reload();
    }

    this.subscriptions.push(
      this.organizationSandbox.isRoleProcessed$.subscribe((isRoleProcessed) => {
        if (isRoleProcessed && !this.organizationSandbox.isSuperAdmin$.value) {
          this.router.navigate(['']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.organizationFilter = {
      ...this.organizationFilter,
      pageSize,
      pageNumber: pageIndex,
      userId: this.userId,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  canEdit(organizationId: number) {
    return this.isAdmin && this.validOrganizations?.some((o) => o.id === organizationId);
  }

  reset(): void {
    this.searchNameValue = '';
    this.searchDescriptionValue = '';
    this.searchContactNameValue = '';
    this.organizationFilter = {
      ...this.organizationFilter,
      name: this.searchNameValue,
      description: this.searchDescriptionValue,
      contactName: this.searchContactNameValue,
    };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  resetNameSearch(): void {
    this.searchNameValue = '';
    this.organizationFilter = { ...this.organizationFilter, name: this.searchNameValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  resetDescriptionSearch(): void {
    this.searchDescriptionValue = '';
    this.organizationFilter = { ...this.organizationFilter, description: this.searchDescriptionValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  resetContactNameSearch(): void {
    this.searchContactNameValue = '';
    this.organizationFilter = { ...this.organizationFilter, contactName: this.searchContactNameValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  searchName(): void {
    this.nameVisible = false;
    this.organizationFilter = { ...this.organizationFilter, name: this.searchNameValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  searchDescription(): void {
    this.descriptionVisible = false;
    this.organizationFilter = { ...this.organizationFilter, description: this.searchDescriptionValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  searchContactName(): void {
    this.contactNameVisible = false;
    this.organizationFilter = { ...this.organizationFilter, contactName: this.searchContactNameValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  handleRequestResult() {
    if (!this.failedStatus) {
      this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
    }
  }

  private registerEvents() {
    this.subscriptions.push(
      this.dataUpdated.currentStatus.subscribe((dataSaved) => {
        this.dataSaved = dataSaved;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.organizationsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.organizationList = res.results;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.loadAction$.subscribe((status) => {
        this.successStatus = status;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.isSuperAdmin$.subscribe((isSuperAdmin) => {
        this.isSuperAdmin = isSuperAdmin;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.userId$.subscribe((userId) => {
        this.userId = userId;
      })
    );

    this.subscriptions.push(
      this.organizationSandbox.userOrganizations$.subscribe((organizations) => {
        this.validOrganizations = organizations;
      })
    );
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
