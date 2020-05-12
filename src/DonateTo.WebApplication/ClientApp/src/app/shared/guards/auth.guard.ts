import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authSandbox: AuthSandbox) {}

  public canActivate(): boolean {
    if (this.authSandbox.isAccessTokenValid()) {
      return true;
    }

    this.authSandbox.login();
    return false;
  }
}
