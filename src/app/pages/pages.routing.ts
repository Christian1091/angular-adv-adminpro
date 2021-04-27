/** Va a tener  la definicion de las rutas que estan internas al directorio page*/
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PagesComponent } from './pages.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
  // Rutas hijas
  {
    //Ruta a partir de un path especifico
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Tema'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario'} },

      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      /**Mantenimientos */
      { path: 'usuarios', component: UsuariosComponent , data: { titulo: 'Usuario de aplicacion'} },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
