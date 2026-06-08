import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario-services';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-registro-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro-component.html',
  styleUrl: './registro-component.css',
})
export class RegistroComponent {
  usuario: Usuario = new Usuario();
  mensaje: string = '';

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  registrar(): void {
    this.usuarioService.registrar(this.usuario).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (e: any) => (this.mensaje = e.error || 'Error al registrar'),
    });
  }
}
