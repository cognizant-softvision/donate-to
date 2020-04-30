import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Donation } from 'src/shared/models/Donation';
import { GetItems } from '../shared/store/donation/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<{ items: Donation[]; cart: [] }>) {
    store.pipe(select((state: any) => state.donation)).subscribe(data => (this.items = data.items));
  }

  items: Donation[] = [];

  ngOnInit(): void {
    this.store.dispatch(new GetItems());
  }
}
