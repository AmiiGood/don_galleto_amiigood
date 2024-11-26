import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiesMainComponent } from './components/cookies-main/cookies-main.component';
import { MainComponent } from './components/main/main.component';
import { ProduccionComponent } from './components/produccion/produccion.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  {
    path: 'cookies',
    component: CookiesMainComponent,
  },
  {
    path: 'ventas',
    component: VentasComponent,
  },
  {
    path: 'produccion',
    component: ProduccionComponent,
  },
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
