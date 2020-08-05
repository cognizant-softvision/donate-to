import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.less'],
})
export class DonationStepFinishComponent implements OnInit, OnDestroy {
  @Input() donationItems: DonationItemModel[];
  @Input() observation: string;
  @Output() isFormValid = new EventEmitter();

  subscriptions: Subscription[] = [];

  constructor(public donationSandbox: DonationSandbox, public translateService: TranslateService) {}

  ngOnInit(): void {
    this.registerEvents();
    this.emitForm();
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

  emitForm() {
    this.isFormValid.emit(this.isFormValid.emit({ value: true, observation: this.observation }));
  }
}
