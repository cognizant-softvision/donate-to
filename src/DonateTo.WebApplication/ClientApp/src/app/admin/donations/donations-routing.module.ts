import { DonationPriorityComponent } from './donations-priority/donations-priority.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationsComponent } from './donations.component';
import { DonationsEditComponent } from './donations-edit/donations-edit.component';
import { DonationsCreateComponent } from './donations-create/donations-create.component';

const routes: Routes = [
  {
    path: '',
    component: DonationsComponent,
    children: [
      { path: 'create', component: DonationsCreateComponent },
      { path: 'edit/:Id', component: DonationsEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationsRoutingModule {}
