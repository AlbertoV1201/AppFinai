import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-admin.html',
  styleUrl: './navbar-admin.css',
})
export class NavbarAdmin {
  router = inject(Router);

  cerrarSesion() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
