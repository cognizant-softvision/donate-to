import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyProfileComponent } from './my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileLayoutRoutingModule {}
