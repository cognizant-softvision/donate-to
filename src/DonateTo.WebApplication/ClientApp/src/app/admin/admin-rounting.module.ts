import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { DonationComponent } from './donation/donation.component';
import { OrganizationComponent } from './organization/organization.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
export class AdminRoutingModule {}
