import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    /*
    children: [
      { path: 'create', component: DonationsCreateComponent },
      { path: 'edit/:Id', component: DonationsEditComponent },
    ],
    */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
