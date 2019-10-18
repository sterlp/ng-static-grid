import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgStaticGridModule } from 'projects/ng-static-grid/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleUsageComponent } from './example/simple-usage/simple-usage.component';
import { ComplexPageComponent } from './example/complex-page/complex-page.component';
import { SaveRestoreComponent } from './example/save-restore/save-restore.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleUsageComponent,
    ComplexPageComponent,
    SaveRestoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgStaticGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
