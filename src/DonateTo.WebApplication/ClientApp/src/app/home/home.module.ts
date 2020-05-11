import { SampleModule } from './sample.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HomeSandbox } from './home.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, SampleModule, TranslateModule.forRoot()],
  declarations: [HomeComponent],
  providers: [HomeSandbox],
})
export class HomeModule {}
