import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {
  private router = inject(Router);

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }
}
