import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
