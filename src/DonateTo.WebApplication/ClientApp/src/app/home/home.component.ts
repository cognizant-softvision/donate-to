import { Component, OnInit } from '@angular/core';
import { HomeSandbox } from './home.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  param = { value: 'world' };

  constructor(public homeSandbox: HomeSandbox) {}

  subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  login() {
    this.homeSandbox.login();
  }

  logout() {
    this.homeSandbox.logout();
  }

  switchLanguage(language: string) {
    this.homeSandbox.switchLanguage(language);
  }
}
