import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UsuarioService } from '../../services/usuario-service';

import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { Usuario } from '../../model/usuario';
import { ResponseDto } from '../../model/response-dto';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  usuarioForm: FormGroup;

  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  constructor() {

    if (localStorage.getItem('token')) {
      localStorage.clear();
    }

    this.usuarioForm = this.fb.group({

      correo: ['', Validators.required],

      contrasena: ['', Validators.required],

    });

  }

  onSubmit(): void {

    if (!this.usuarioForm.valid) {

      alert('Formulario inválido');

      return;

    }

    const usuario = new Usuario();

    usuario.correo = this.usuarioForm.value.correo;
    usuario.contrasena = this.usuarioForm.value.contrasena;

    this.usuarioService.login(usuario).subscribe({

      next: (data: ResponseDto) => {

        localStorage.setItem('token', data.token);
        localStorage.setItem('idUsuario', data.idUsuario.toString());
        localStorage.setItem('rol', data.rol);

        alert(data.mensaje);

        if (data.rol === 'ROLE_ADMIN') {

          this.router.navigate(['/admin']);

        } else {

          this.router.navigate(['/home']);

        }

      },

      error: (err) => {

        console.error(err);

        alert('Correo o contraseña incorrectos');

      }

    });

  }

}
