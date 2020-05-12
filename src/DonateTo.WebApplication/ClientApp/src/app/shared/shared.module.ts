import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule],
  exports: [CommonModule, TranslateModule],
})
export class SharedModule {}
