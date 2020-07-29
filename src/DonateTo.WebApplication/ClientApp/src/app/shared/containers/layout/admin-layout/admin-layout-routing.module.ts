import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'donations', pathMatch: 'prefix' },
      { path: 'user', loadChildren: () => import('../../../../admin/user/user.module').then((m) => m.UserModule) },
      {
        path: 'donations',
        loadChildren: () => import('../../../../admin/donations/donations.module').then((m) => m.DonationsModule),
      },
      {
        path: 'organizations',
        loadChildren: () =>
          import('../../../../admin/organization/organization.module').then((m) => m.OrganizationModule),
      },
      {
        path: 'priority-questions',
        loadChildren: () =>
          import('../../../../admin/priority-questions/questions.module').then((m) => m.QuestionsModule),
      },
      {
        path: 'logs',
        loadChildren: () => import('../../../../admin/log/log.module').then((m) => m.LogModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
