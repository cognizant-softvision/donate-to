import { Component, OnInit, Input } from '@angular/core';
import { Donation } from 'src/shared/models/Donation';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

  // constructor(private store: Store<{}>) { }

  @Input() donation: Donation;  

  ngOnInit() {}

  doSomethingWithStore() {
    //this.store.dispatch(new AddItem()) ?
  }

  doSomethingElse() {
    // this.store.dispatch(new ...) ?
  }
}
