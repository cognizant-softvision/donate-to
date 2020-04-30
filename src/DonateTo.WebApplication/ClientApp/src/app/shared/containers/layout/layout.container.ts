import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutSandbox } from './layout.sandbox';

@Component({
  selector: 'app-layout',
  template: './layout.container.html',
  styleUrls: ['./layout.container.scss']
})
export class LayoutContainer {

  public userImage: string = '';
  public userEmail: string = '';
  private assetsFolder: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    public layoutSandbox: LayoutSandbox
  ) {
  }

  ngOnInit() {
  }

  private registerEvents() {
  }
}
