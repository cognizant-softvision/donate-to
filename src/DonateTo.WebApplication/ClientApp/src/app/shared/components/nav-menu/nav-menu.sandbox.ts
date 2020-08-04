import { Injectable } from '@angular/core';
import { Sandbox } from '../../sandbox/base.sandbox';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import * as store from '../../../shared/store';
import { AuthSandbox } from '../../auth/auth.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { en_US, es_ES, NzI18nService } from 'ng-zorro-antd';

@Injectable()
export class NavMenuSandBox extends Sandbox {
  private subscriptions: Subscription[] = [];
  hasAdminRole = false;

  constructor(
    protected appState$: Store<store.State>,
    public authSandbox: AuthSandbox,
    public translateService: TranslateService,
    protected i18n: NzI18nService
  ) {
    super(appState$);
    this.registerEvents();
    this.hasAdminRole = false;
  }

  /**
   * User logs in the application
   */
  public login(): void {
    this.authSandbox.login();
  }

  /**
   * User register on the application
   */
  public register(): void {
    this.authSandbox.register();
  }

  /**
   * User logs out the application
   */
  public logout(): void {
    this.authSandbox.logout();
  }

  /**
   * Change the language
   */
  switchLanguage(language: string) {
    this.translateService.use(language);
    this.SetCurrentLocale(language);
  }

  // FIX the update of the i18n service should be place in an upper lvl
  SetCurrentLocale(locale) {
    switch (locale) {
      case 'es':
        this.i18n.setLocale(es_ES);
        break;

      default:
        this.i18n.setLocale(en_US);
        break;
    }
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
    // Subscribes to culture
    this.subscriptions.push(this.culture$.subscribe((culture: string) => (this.culture = culture)));
    // Subscribes to auth properties
    this.subscriptions.push(
      this.isAuthenticated$.subscribe((isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated))
    );
    this.subscriptions.push(
      this.authSandbox.hasAdminRole.asObservable().subscribe((hasAdminRole) => (this.hasAdminRole = hasAdminRole))
    );
  }
}
