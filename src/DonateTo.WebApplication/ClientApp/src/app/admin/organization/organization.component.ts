import { AuthSandbox } from './../../shared/auth/auth.sandbox';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { OrganizationFilter } from 'src/app/shared/models/filters/organization-filter';
import { OrganizationModel } from './../../shared/models';
import { OrganizationSandbox } from './organization-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { FilterService } from 'src/app/shared/async-services/filter.service';

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
  searchUsersQuantityValue = '';
  searchContactNameValue = '';
  nameVisible = false;
  usersQuantityVisible = false;
  contactNameVisible = false;
  failedStatus = false;
  successStatus = false;
  dataSaved = false;
  isAdmin = false;
  filter: string;

  constructor(
    public organizationSandbox: OrganizationSandbox,
    public authSandbox: AuthSandbox,
    public router: Router,
    private dataUpdated: DataUpdatedService,
    private filterUsers: FilterService
  ) {}

  ngOnInit(): void {
    this.organizationFilter = {
      ...this.organizationFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
    };

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

    this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
    if (this.dataSaved) {
      this.dataUpdated.changeMessage(false);
      window.location.reload();
    }

    this.subscriptions.push(
      this.organizationSandbox.isRoleProcessed$.subscribe((isRoleProcessed) => {
        if (isRoleProcessed && !this.organizationSandbox.isOrganization$.value) {
          this.router.navigate(['']);
        }
      })
    );

    this.subscriptions.push(
      this.authSandbox.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      })
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.organizationFilter = {
      ...this.organizationFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  reset(): void {
    this.searchNameValue = '';
    this.searchUsersQuantityValue = '';
    this.searchContactNameValue = '';
    this.organizationFilter = {
      ...this.organizationFilter,
      name: this.searchNameValue,
      description: this.searchUsersQuantityValue,
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
    this.searchUsersQuantityValue = '';
    this.organizationFilter = { ...this.organizationFilter };
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
    this.usersQuantityVisible = false;
    this.organizationFilter = { ...this.organizationFilter };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  searchContactName(): void {
    this.contactNameVisible = false;
    this.organizationFilter = { ...this.organizationFilter, contactName: this.searchContactNameValue };
    this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  handleRequestResult() {
    if (!this.failedStatus) {
      this.organizationSandbox.loadOrganizationsFilteredPaged(this.organizationFilter);
    }
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  seeAssociatedUsers(organizationName: string) {
    this.filterUsers.changeFilter(organizationName);
    this.router.navigate(['./admin/users']);
  }
}
