import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookiesMainComponent } from './components/cookies-main/cookies-main.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angularMaterialImports/angularMaterial.module';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [AppComponent, CookiesMainComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule, AngularMaterialModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
