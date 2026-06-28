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
import { ReportesComponent } from './componente/reportes-component/reportes-component';
import { ReportePresupuestoComponent } from './componente/reporte-presupuesto-component/reporte-presupuesto-component';
import { TicketComponent } from './componente/ticket-component/ticket-component';
import { TicketNuevoComponent } from './componente/ticket-nuevo-component/ticket-nuevo-component';
import { AdminHomeComponent } from './componente/admin-home-component/admin-home-component';
import { AdminTicketComponent } from './componente/admin-ticket-component/admin-ticket-component';
import { AdminResponderTicketComponent } from './componente/admin-ticket-responder-component/admin-ticket-responder-component';
import { ReporteMetaComponent } from './componente/reporte-meta-component/reporte-meta-component';
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
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'reportes/presupuestos',
    component: ReportePresupuestoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'reportes/metas',
    component: ReporteMetaComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'tickets',
    component: TicketComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'ticket-nuevo',
    component: TicketNuevoComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/tickets',
    component: AdminTicketComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin/tickets/:id',
    component: AdminResponderTicketComponent,
    canActivate: [AuthGuard],
  },
];
