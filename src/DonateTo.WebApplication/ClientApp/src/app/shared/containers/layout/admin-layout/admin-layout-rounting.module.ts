import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminComponent } from '../../../../admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{ path: '', component: AdminComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
