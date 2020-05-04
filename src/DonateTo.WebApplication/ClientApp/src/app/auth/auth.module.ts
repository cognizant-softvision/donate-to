import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../shared/components';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, ComponentsModule],
  declarations: [],
  providers: [],
})
export class AuthModule {}
