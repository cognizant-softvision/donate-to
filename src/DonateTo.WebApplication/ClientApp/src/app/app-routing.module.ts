import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { AuthOrganizationGuard } from './shared/guards/auth-organization.guard';

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
    canLoad: [AuthOrganizationGuard],
  },
  {
    path: 'donation',
    loadChildren: () =>
      import('./shared/containers/layout/donation-layout/donation-layout.module').then((m) => m.DonationLayoutModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./home/my-profile/my-profile-layout.module').then((m) => m.ProfileLayoutModule),
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
