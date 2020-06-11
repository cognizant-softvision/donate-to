import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shared/containers/layout/donator-layout/donator-layout.module').then((m) => m.DonatorLayoutModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./shared/containers/layout/admin-layout/admin-layout.module').then((m) => m.AdminLayoutModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'donation',
    loadChildren: () =>
      import('./shared/containers/layout/donation-layout/donation-layout.module').then((m) => m.DonationLayoutModule),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./basic-pages/basic-pages.module').then((m) => m.BasicPagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
