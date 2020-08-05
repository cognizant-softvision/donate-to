import { OrganizationModel, UserModel } from './../../shared/models';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { Subscription } from 'rxjs';
import { UserSandbox } from './user.sandbox';
import { UserFilter } from '../../shared/models/filters/user-filter';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { FilterService } from 'src/app/shared/async-services/filter.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(PopupModalComponent) private popUpModalComponent: PopupModalComponent;
  user: UserModel;
  users: UserModel[] = [];
  usersList: UserModel[] = [];
  private isSubmited = false;
  private subscriptions: Subscription[] = [];
  searchNameValue = '';
  searchNameVisible = false;
  searchOrganizationValue = '';
  searchOrganizationVisible = false;
  searchEmailValue = '';
  searchEmailVisible = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  userFilter = new UserFilter();
  failedStatus = false;
  successStatus = false;
  organizationName = '';
  search = '';

  constructor(private userSandbox: UserSandbox, private route: ActivatedRoute, private filterUsers: FilterService) {}

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  ngOnInit(): void {
    this.route.queryParams
      .filter((params) => params.organizationName)
      .subscribe((params) => {
        this.organizationName = params.organizationName;

        this.userFilter = {
          ...this.userFilter,
          pageSize: this.pageSize,
          pageNumber: this.pageIndex,
          organization: this.organizationName,
        };
      });

    this.subscriptions.push(
      this.userSandbox.usersPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.usersList = res.results;
      })
    );

    this.subscriptions.push(
      this.userSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.userSandbox.loadAction$.subscribe((status) => {
        this.successStatus = status;
        this.handleRequestResult();
      })
    );

    this.filterUsers.currentFilter.subscribe((filter) => {
      this.search = filter;
    });

    if (this.search) {
      this.userFilter = {
        ...this.userFilter,
        pageSize: this.pageSize,
        pageNumber: this.pageIndex,
        organization: this.organizationName,
      };

      this.searchOrganizationValue = this.search;
      this.searchOrganization();
      this.filterUsers.changeFilter('');
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.userFilter = {
      ...this.userFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  editUser(user: UserModel) {
    this.popUpModalComponent.ShowModal(user);
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (!this.failedStatus) {
        this.userSandbox.loadUsersFilteredPaged(this.userFilter);
        this.isSubmited = false;
      }
    }
  }

  showOrganizations(organizations: OrganizationModel[]) {
    return organizations.map(({ name }) => name).join(', ');
  }

  associateResult(data: any) {
    this.isSubmited = data;
  }

  reset(): void {
    this.organizationName = '';
    this.searchNameValue = '';
    this.searchOrganizationValue = '';
    this.searchEmailValue = '';
    this.userFilter = {
      ...this.userFilter,
      fullName: this.searchNameValue,
      organization: this.searchOrganizationValue,
      email: this.searchEmailValue,
    };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  resetNameSearch(): void {
    this.searchNameValue = '';
    this.userFilter = { ...this.userFilter, fullName: this.searchNameValue };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  resetOrganizationSearch(): void {
    this.searchOrganizationValue = '';
    this.userFilter = { ...this.userFilter, organization: this.searchOrganizationValue };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  resetEmailSearch(): void {
    this.searchEmailValue = '';
    this.userFilter = { ...this.userFilter, email: this.searchEmailValue };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  searchName(): void {
    this.searchNameVisible = false;
    this.userFilter = { ...this.userFilter, fullName: this.searchNameValue };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  searchOrganization(): void {
    this.searchOrganizationVisible = false;
    this.userFilter = { ...this.userFilter, organization: this.searchOrganizationValue };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }

  searchEmail(): void {
    this.searchEmailVisible = false;
    this.userFilter = { ...this.userFilter, email: this.searchEmailValue };
    this.userSandbox.loadUsersFilteredPaged(this.userFilter);
  }
}
