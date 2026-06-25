import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    this.router.navigate(['/login']);
  }
}
