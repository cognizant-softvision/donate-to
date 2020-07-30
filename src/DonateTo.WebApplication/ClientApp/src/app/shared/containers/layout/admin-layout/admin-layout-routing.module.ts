import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { AuthSuperAdminGuard } from 'src/app/shared/guards/auth-superadmin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'donations', pathMatch: 'prefix' },
      { path: 'users', loadChildren: () => import('../../../../admin/user/user.module').then((m) => m.UserModule) },
      {
        path: 'donations',
        loadChildren: () => import('../../../../admin/donations/donations.module').then((m) => m.DonationsModule),
      },
      {
        path: 'organizations',
        loadChildren: () =>
          import('../../../../admin/organization/organization.module').then((m) => m.OrganizationModule),
        canLoad: [AuthSuperAdminGuard],
      },
      {
        path: 'questions',
        loadChildren: () => import('../../../../admin/questions/questions.module').then((m) => m.QuestionsModule),
        canLoad: [AuthSuperAdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
