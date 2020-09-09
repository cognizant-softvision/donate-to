import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { MyDonationSandbox } from './my-donation.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { DonationModel } from '../shared/models/donation.model';

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.less'],
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
    this.subscriptions.push(
      this.donationSandbox.isRoleProcessed$.subscribe((isRoleProcessed) => {
        if (isRoleProcessed && !this.donationSandbox.isDonor$.value) {
          this.route.navigate(['']);
        }
      })
    );
  }

  submited(value: boolean): void {
    this.isSubmited = value;
  }
}
