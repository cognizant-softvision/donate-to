import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';

@Injectable()
export class AuthAdminGuard implements CanActivate, CanLoad {
  constructor(private authSandbox: AuthSandbox) {}

  public canActivate() {
    return this.checkIsAuthenticated();
  }

  public canLoad() {
    return this.checkIsAuthenticated();
  }

  private checkIsAuthenticated() {
    // if (this.authSandbox.validateToken() && this.authSandbox.isAdmin.value) {
    //   return true;
    // }

    // this.authSandbox.login();
    return true;
  }
}
