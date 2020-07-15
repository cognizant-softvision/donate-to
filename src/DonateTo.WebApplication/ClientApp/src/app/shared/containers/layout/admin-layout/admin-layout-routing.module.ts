import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { OrganizationComponent } from '../../../../admin/organization/organization.component';

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
      { path: 'organization', component: OrganizationComponent },
      {
        path: 'question',
        loadChildren: () => import('../../../../admin/question/question.module').then((m) => m.QuestionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
