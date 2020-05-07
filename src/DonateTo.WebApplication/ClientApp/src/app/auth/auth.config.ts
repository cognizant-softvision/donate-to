import { AuthConfig } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { ConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(private config: ConfigService) {
    config.load();
  }

  getConfig(): AuthConfig {
    console.log(this.config.get('authConfig'));
    return {
      issuer: 'https://localhost:44392',
      redirectUri: window.location.origin,
      clientId: 'DonateTo.WebAplication',
      responseType: 'code',
      scope: 'openid profile',
      showDebugInformation: true,
    };
  }
}

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://localhost:44392',
  redirectUri: window.location.origin,
  clientId: 'DonateTo.WebAplication',
  responseType: 'code',
  scope: 'openid profile',
  showDebugInformation: true,
};
