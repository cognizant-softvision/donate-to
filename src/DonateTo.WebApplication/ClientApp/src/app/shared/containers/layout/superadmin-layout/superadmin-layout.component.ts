import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthSandbox } from 'src/app/shared/auth/auth.sandbox';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin-layout',
  templateUrl: './superadmin-layout.component.html',
  styleUrls: ['./superadmin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SuperAdminLayoutComponent implements OnInit, OnDestroy {
  menus = [
    { title: 'Admin.Menu.Title.Donation', url: './donations', iconType: 'heart' },
    { title: 'Admin.Menu.Title.User', url: './user', iconType: 'team' },
    { title: 'Admin.Menu.Title.Organization', url: './organization', iconType: 'profile' },
  ];

  subscriptions: Subscription[] = [];

  constructor(private authSandbox: AuthSandbox, private router: Router) {}

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authSandbox.isAdmin.subscribe((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
