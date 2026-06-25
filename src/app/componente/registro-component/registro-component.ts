import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../model/usuario';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-registro-component',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton],
  templateUrl: './registro-component.html',
  styleUrl: './registro-component.css',
})
export class RegistroComponent {
  usuarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  constructor() {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      telefono: [''],
    });
  }
  onSubmit() {
    if (this.usuarioForm.valid) {
      let usuario = new Usuario();
      usuario.nombre = this.usuarioForm.controls['nombre'].value;
      usuario.apellido = this.usuarioForm.controls['apellido'].value;
      usuario.correo = this.usuarioForm.controls['correo'].value;
      usuario.contrasena = this.usuarioForm.controls['contrasena'].value;
      usuario.telefono = this.usuarioForm.controls['telefono'].value;
      this.usuarioService.registrar(usuario).subscribe({
        next: data => {
          alert('Usuario Registrado con Exito');
          this.router.navigate(['/login']);
        },
        error: err => {
          alert('Error al registrar');
          console.log(err);
        },
      });
    } else {
      alert('Formulario invalido');
    }
  }
}
