import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { NzButtonModule, NzIconModule, NzLayoutModule, NzMenuModule, NzRadioModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from '@ant-design/icons-angular';
import { CaretDownFill } from '@ant-design/icons-angular/icons';

import { TranslateModule } from '@ngx-translate/core';
import { NavMenuSandBox } from './nav-menu/nav-menu.sandbox';
import { RouterModule } from '@angular/router';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user';
import { StoreModule } from '@ngrx/store';
import { fromUser } from '../store';

export const COMPONENTS = [NavMenuComponent];
const ICONS: IconDefinition[] = [CaretDownFill];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
    TranslateModule,
    RouterModule,
    NzRadioModule,
    NzDropDownModule,
    NzIconModule.forChild(ICONS),

    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [NavMenuSandBox, UserSandbox],
})
export class ComponentsModule {}
