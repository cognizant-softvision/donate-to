import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{ path: 'edit/:Id', component: UserEditComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
