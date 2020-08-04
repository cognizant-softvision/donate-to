import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrganizationComponent } from './organization.component';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { AuthSuperAdminGuard } from 'src/app/shared/guards/auth-superadmin.guard';
import { AuthAdminGuard } from 'src/app/shared/guards/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      { path: 'create', component: OrganizationCreateComponent, canLoad: [AuthSuperAdminGuard] },
      { path: 'edit/:Id', component: OrganizationEditComponent, canLoad: [AuthAdminGuard] },
      { path: 'detail/:Id', component: OrganizationDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
