import { MyProfileComponent } from './../../../../home/my-profile/my-profile/my-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../../../home/home.component';
import { DonatorLayoutComponent } from './donator-layout.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DonatorLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'my-profile', component: MyProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatorLayoutRoutingModule {}
