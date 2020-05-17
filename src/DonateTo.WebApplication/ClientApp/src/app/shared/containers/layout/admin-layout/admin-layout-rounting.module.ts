import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { UserComponent } from '../../../../admin/user/user.component';
import { DonationComponent } from '../../../../admin/donation/donation.component';
import { OrganizationComponent } from '../../../../admin/organization/organization.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'donation', pathMatch: 'prefix' },
      { path: 'user', component: UserComponent },
      { path: 'donation', component: DonationComponent },
      { path: 'organization', component: OrganizationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
