import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';

@Injectable()
export class AuthSuperAdminGuard implements CanActivate, CanLoad {
  constructor(private authSandbox: AuthSandbox) {}

  public canActivate() {
    return this.checkHasSuperAdminRole();
  }

  public canLoad() {
    return this.checkHasSuperAdminRole();
  }

  private checkHasSuperAdminRole() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.checkIsAuthenticated()) {
        this.authSandbox.isLoginProcessed$.subscribe((isLoginProcessed) => {
          isLoginProcessed && this.authSandbox.isSuperAdmin.value ? resolve(true) : resolve(false);
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
