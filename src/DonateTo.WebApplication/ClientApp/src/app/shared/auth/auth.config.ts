import { AuthConfig } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(private config: ConfigService) {}

  async getConfig(): Promise<AuthConfig> {
    await this.config.load();
    return this.config.get('authConfig');
  }
}
