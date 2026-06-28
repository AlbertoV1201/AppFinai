import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { Navbar } from './componente/navbar/navbar';
import { NavbarAdmin } from './componente/navbar-admin/navbar-admin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, NavbarAdmin],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AppFinia');

  router = inject(Router);

  verNavbar(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/registro';
  }

  mostrarNavbarUsuario(): boolean {
    return this.verNavbar() && localStorage.getItem('rol') === 'ROLE_USER';
  }

  mostrarNavbarAdmin(): boolean {
    return this.verNavbar() && localStorage.getItem('rol') === 'ROLE_ADMIN';
  }
}
