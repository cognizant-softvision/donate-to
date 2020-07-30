import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';

@Injectable()
export class AuthAdminGuard implements CanActivate, CanLoad {
  constructor(private authSandbox: AuthSandbox) {}

  public canActivate() {
    return this.checkHasAdminRole();
  }

  public canLoad() {
    return this.checkHasAdminRole();
  }

  private checkHasAdminRole() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.checkIsAuthenticated()) {
        this.authSandbox.isLoginProcessed$.subscribe((isLoginProcessed) => {
          isLoginProcessed && this.authSandbox.isAdmin.value ? resolve(true) : resolve(false);
        });
      } else {
        reject(false);
      }
    });
  }

  private checkIsAuthenticated() {
    if (this.authSandbox.validateToken()) {
      return true;
    }

    this.authSandbox.login();
  }
}
