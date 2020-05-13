import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutSandbox } from './layout.sandbox';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.container.html',
  styleUrls: ['./layout.container.css'],
})
export class LayoutContainerComponent {
  public userImage = '';
  public userEmail = '';
  private assetsFolder: string;

  private subscriptions: Subscription[] = [];

  constructor(public layoutSandbox: LayoutSandbox) {}

  private registerEvents() {}
}
