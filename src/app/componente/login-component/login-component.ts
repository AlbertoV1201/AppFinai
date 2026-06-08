import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario-services';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  mensaje: string = '';

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  login(): void {
    this.usuarioService.login(this.correo, this.contrasena).subscribe({
      next: () => this.router.navigate(['/menu']),
      error: () => (this.mensaje = 'Credenciales inválidas'),
    });
  }
}
