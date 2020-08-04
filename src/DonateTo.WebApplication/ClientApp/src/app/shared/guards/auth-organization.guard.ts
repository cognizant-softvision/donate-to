import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';

@Injectable()
export class AuthOrganizationGuard implements CanActivate, CanLoad {
  constructor(private authSandbox: AuthSandbox) {}

  public canActivate() {
    return this.checkHasOrganizationRole();
  }

  public canLoad() {
    return this.checkHasOrganizationRole();
  }

  private checkHasOrganizationRole() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.checkIsAuthenticated()) {
        this.authSandbox.isLoginProcessed$.subscribe((isLoginProcessed) => {
          isLoginProcessed &&
          (this.authSandbox.isOrganization.value ||
            this.authSandbox.isAdmin.value ||
            this.authSandbox.isSuperAdmin.value)
            ? resolve(true)
            : resolve(false);
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
