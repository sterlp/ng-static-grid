import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgStaticGridModule } from 'projects/ng-static-grid/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleUsageComponent } from './example/simple-usage/simple-usage.component';
import { ComplexPageComponent } from './example/complex-page/complex-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleUsageComponent,
    ComplexPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgStaticGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
