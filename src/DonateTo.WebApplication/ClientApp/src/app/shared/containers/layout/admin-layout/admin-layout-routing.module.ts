import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { OrganizationComponent } from 'src/app/admin/organization/organization.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'donations', pathMatch: 'prefix' },
      { path: 'user', loadChildren: () => import('src/app/admin/user/user.module').then((m) => m.UserModule) },
      {
        path: 'donations',
        loadChildren: () => import('src/app/admin/donations/donations.module').then((m) => m.DonationsModule),
      },
      { path: 'organization', component: OrganizationComponent },
      {
        path: 'priority-questions',
        loadChildren: () => import('src/app/admin/priority-questions/questions.module').then((m) => m.QuestionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
