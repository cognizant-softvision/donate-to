import { Component, Input, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.css'],
})
export class DonationStepFinishComponent implements OnInit, OnDestroy {
  @Input() donationItems: DonationItemModel[];
  @Input() observation: string;
  @Output() isFormValid = new EventEmitter();

  subscriptions: Subscription[] = [];

  constructor(public donationSandbox: DonationSandbox, public translateService: TranslateService) {}

  ngOnInit(): void {
    this.registerEvents();
    this.isFormValid.emit(this.isFormValid.emit({ value: true, observation: this.observation }));
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
    this.subscriptions.push();
  }
}
