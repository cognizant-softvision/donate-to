import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationsComponent } from './donations.component';
import { DonationsEditComponent } from './donations-edit/donations-edit.component';
import { DonationsCreateComponent } from './donations-create/donations-create.component';
import { DonationsDetailComponent } from './donations-detail/donations-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DonationsComponent,
    children: [
      { path: 'create', component: DonationsCreateComponent },
      { path: 'edit/:Id', component: DonationsEditComponent },
      { path: 'detail/:Id', component: DonationsDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationsRoutingModule {}
