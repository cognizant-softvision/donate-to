import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authSandbox: AuthSandbox) {}

  public canActivate() {
    return this.checkIsAuthenticated();
  }

  public canLoad() {
    return this.checkIsAuthenticated();
  }

  private checkIsAuthenticated() {
    if (this.authSandbox.validateToken()) {
      return true;
    }

    this.authSandbox.login();
  }
}
