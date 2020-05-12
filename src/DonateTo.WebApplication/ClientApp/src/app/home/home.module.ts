import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HomeSandbox } from './home.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [HomeComponent],
  providers: [HomeSandbox],
})
export class HomeModule {}
