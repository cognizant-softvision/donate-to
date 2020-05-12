import { AuthConfig } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(private config: ConfigService) {}

  /**
   * Gets AuthConfig from env configuration
   */
  getConfig(): AuthConfig {
    return this.config.get('authConfig');
  }
}
