import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SuperAdminLayoutComponent } from './superadmin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/admin/donations/donations.module').then((m) => m.DonationsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminLayoutRoutingModule {}
