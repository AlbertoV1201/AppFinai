import { Routes } from '@angular/router';

import { LoginComponent } from './componente/login-component/login-component';
import { RegistroComponent } from './componente/registro-component/registro-component';
import { HomeComponent } from './componente/home-component/home-component';
import { RegistroMontoComponent } from './componente/registro-monto-component/registro-monto-component';
import { MetaComponent } from './componente/meta-component/meta-component';
import { MetaNuevoComponent } from './componente/meta-nuevo-component/meta-nuevo-component';
import { PresupuestoComponent } from './componente/presupuesto-component/presupuesto-component';
import { PresupuestoNuevoComponent } from './componente/presupuesto-nuevo-component/presupuesto-nuevo-component';
import { RecomendacionComponent } from './componente/recomendacion-component/recomendacion-component';

import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'registro',
    component: RegistroComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'registrar/:tipo',
    component: RegistroMontoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'metas',
    component: MetaComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'meta-nuevo',
    component: MetaNuevoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'presupuesto',
    component: PresupuestoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'presupuesto-nuevo',
    component: PresupuestoNuevoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'recomendaciones',
    component: RecomendacionComponent,
    canActivate: [AuthGuard],
  },
];
