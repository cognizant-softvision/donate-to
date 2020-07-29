import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressModel, CityModel, CountryModel, OrganizationModel, StateModel } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationSandbox } from '../organization-sandbox';
import { getOrganization } from 'src/app/shared/store/organization';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css'],
})
export class OrganizationDetailComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  addresses: AddressModel[] = [];

  organization: OrganizationModel;
  organizationAddress: AddressModel = new AddressModel();
  private failedStatus = false;
  private isSubmited = false;
  isErrorModalActive = false;
  id: number;

  title: string;
  subtitle: string;

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
    this.registerEvents();
    this.organizationSandbox.loadOrganization(this.id);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.organizationSandbox.organization$.subscribe((organization) => {
        this.organization = organization;
        this.showDetail();
      })
    );
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
    this.router.navigate(['/admin/organizations']);
  }

  showDetail() {
    this.title = this.organization?.name;
    this.subtitle = this.organization?.description;

    this.organization?.addresses.forEach((a) => {
      const countryAux = new CountryModel();
      const stateAux = new StateModel();
      const city = new CityModel();
      countryAux.name = this.countries.find((x) => x.id === a.countryId)?.name;
      stateAux.name = this.states.find((x) => x.id === a.stateId)?.name;

      a = {
        ...a,
        country: countryAux,
        state: stateAux,
      };
    });
  }
}
