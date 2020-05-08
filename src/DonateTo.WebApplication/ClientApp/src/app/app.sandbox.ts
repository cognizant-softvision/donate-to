import { Injectable } from '@angular/core';
import { Sandbox } from './shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from './shared/store';
import { ConfigService } from './app-config.service';

@Injectable()
export class AppSandbox extends Sandbox {
  constructor(protected appState$: Store<store.State>, private configService: ConfigService) {
    super(appState$);
  }

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {}

  /**
   * Returns global notification options
   */
  public getNotificationOptions(): any {
    return this.configService.get('notifications').options;
  }
}
