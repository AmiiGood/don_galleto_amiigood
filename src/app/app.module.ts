import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookiesMainComponent } from './components/cookies-main/cookies-main.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angularMaterialImports/angularMaterial.module';
import { MainComponent } from './components/main/main.component';
import { ProduccionComponent } from './components/produccion/produccion.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DeleteProductionDialogComponent } from './components/delete-production-dialog/delete-production-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CookiesMainComponent,
    MainComponent,
    ProduccionComponent,
    VentasComponent,
    RecipeDialogComponent,
    ConfirmDialogComponent,
    DeleteProductionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
