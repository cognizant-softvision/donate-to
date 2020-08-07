import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzFormModule, NzInputModule, NzLayoutModule, NzTableModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditTwoTone, SettingTwoTone, SmileTwoTone } from '@ant-design/icons-angular/icons';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/basic-pages/basic-pages.module';
import { HttpClient } from '@angular/common/http';
import { MyProfileComponent } from './my-profile.component';
import { ProfileLayoutRoutingModule } from './my-profile-layout-routing.module';
import { ComponentsModule } from 'src/app/shared/components';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/shared/store/user';
import { StoreModule } from '@ngrx/store';
import { fromUser } from 'src/app/shared/store';

const icons = [SmileTwoTone, SettingTwoTone, EditTwoTone];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzTableModule,
    NzSpaceModule,
    NzInputModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzFormModule,
    NzTabsModule,
    ReactiveFormsModule,
    NzIconModule.forChild(icons),
    ProfileLayoutRoutingModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
    ComponentsModule,
  ],
  declarations: [MyProfileComponent],
  providers: [UserSandbox],
})
export class ProfileLayoutModule {}
