import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrganizationComponent } from './organization.component';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      { path: 'create', component: OrganizationCreateComponent },
      { path: 'edit/:Id', component: OrganizationEditComponent },
      { path: 'detail/:Id', component: OrganizationDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
