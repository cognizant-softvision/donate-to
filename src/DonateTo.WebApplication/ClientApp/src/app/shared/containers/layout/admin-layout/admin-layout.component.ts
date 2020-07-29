import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthSandbox } from '../../../../shared/auth/auth.sandbox';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IconType } from 'src/app/shared/enum/iconTypes';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  isSuperAdmin: boolean;

  menus: Array<{ title: string; url: string; iconType: string; show: boolean }> = [];

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

    this.subscriptions.push(
      this.authSandbox.isSuperAdmin.subscribe((isSuperAdmin) => {
        this.isSuperAdmin = isSuperAdmin;
        this.menus = [
          { title: 'Admin.Menu.Title.Donation', url: './donations', iconType: IconType.Heart, show: true },
          { title: 'Admin.Menu.Title.Users', url: './users', iconType: IconType.Team, show: true },
          { title: 'Admin.Menu.Title.Organizations', url: './organizations', iconType: IconType.Profile, show: true },
          {
            title: 'Admin.Menu.Title.Questions',
            url: './questions',
            iconType: IconType.Star,
            show: this.isSuperAdmin,
          },
        ];
      })
    );
  }
}
