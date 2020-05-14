import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NZ_ICONS, NzIconModule, NzLayoutModule } from 'ng-zorro-antd';

import { HeartOutline, ProfileOutline, TeamOutline } from '@ant-design/icons-angular/icons';
import { AdminSandbox } from './admin.sandbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [NzIconModule, NzLayoutModule, TranslateModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AdminComponent],
  providers: [
    AdminSandbox,
    {
      provide: NZ_ICONS,
      useValue: [HeartOutline, ProfileOutline, TeamOutline],
    },
  ],
})
export class AdminModule {}
