import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HomeSandbox } from './home.sandbox';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [HomeComponent],
  providers: [HomeSandbox],
})
export class HomeModule {}
