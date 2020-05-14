import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthSandbox } from '../auth/auth.sandbox';
import { filter, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean;

  constructor(private authSandbox: AuthSandbox) {
    this.authSandbox.isAuthenticated$.subscribe((isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated));
  }

  public canActivate() {
    return this.authSandbox.isLoginProcessed$.pipe(
      filter((isDone) => isDone),
      tap((_) => this.isAuthenticated || this.authSandbox.login()),
      map((_) => this.isAuthenticated)
    );
  }
}
