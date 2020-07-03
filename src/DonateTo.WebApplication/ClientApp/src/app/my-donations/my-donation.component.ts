import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { MyDonationSandbox } from './my-donation.sandbox';
import { MyDonationsListComponent } from './components/list/my-donations-list.component';
import { TranslateService } from '@ngx-translate/core';
import { DonationModel } from '../shared/models/donation.model';

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css'],
})
export class MyDonationsComponent implements OnInit, OnDestroy {
  constructor(
    protected router: ActivatedRoute,
    public donationSandbox: MyDonationSandbox,
    protected route: Router,
    public translateService: TranslateService
  ) {}

  donations: DonationModel[] = [];
  isSubmited = false;

  @Input() userId: number;
  @Input() isEdit: boolean;

  subscriptions: Subscription[] = [];

  @ViewChild(MyDonationsListComponent)
  private donationListComponent: MyDonationsListComponent;

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Unsubscribes from events
   */
  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  registerEvents(): void {
    // this.subscriptions.push(
    //   this.donationSandbox.donations$.subscribe((donations) => {
    //     this.donations = donations.results;
    //   })
    // );
  }

  submited(value: boolean): void {
    this.isSubmited = value;
  }
}
