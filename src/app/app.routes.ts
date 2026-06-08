import { Routes } from '@angular/router';
import { LoginComponent } from './componente/login-component/login-component';
import { RegistroComponent } from './componente/registro-component/registro-component';
import { MenuComponent } from './componente/menu-component/menu-component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'menu', component: MenuComponent },
];
