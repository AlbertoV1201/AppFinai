import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { PresupuestoService } from '../../services/presupuesto-service';
import { Presupuesto } from '../../model/presupuesto';

@Component({
  selector: 'app-presupuesto-nuevo-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInputModule,
    MatInput,
    MatSelectModule,
  ],
  templateUrl: './presupuesto-nuevo-component.html',
  styleUrl: './presupuesto-nuevo-component.css',
})
export class PresupuestoNuevoComponent {
  presupuestoForm: FormGroup;

  fb = inject(FormBuilder);
  presupuestoService = inject(PresupuestoService);
  router = inject(Router);

  constructor() {
    this.presupuestoForm = this.fb.group({
      nombrePresupuesto: ['', Validators.required],

      categoria: ['', Validators.required],

      tipo: ['', Validators.required],

      montoPromedioMensual: ['', Validators.required],
    });
  }

  registrar() {
    if (this.presupuestoForm.valid) {
      let presupuesto = new Presupuesto();

      presupuesto.nombrePresupuesto = this.presupuestoForm.value.nombrePresupuesto;

      presupuesto.categoria = this.presupuestoForm.value.categoria;

      presupuesto.tipo = this.presupuestoForm.value.tipo;

      presupuesto.montoPromedioMensual = this.presupuestoForm.value.montoPromedioMensual;

      console.log(presupuesto);

      this.presupuestoService.insert(presupuesto).subscribe({
        next: () => {
          alert('Presupuesto registrado con éxito');

          this.router.navigate(['/presupuesto']);
        },

        error: (err) => {
          console.error(err);

          alert('No se pudo registrar el presupuesto');
        },
      });
    } else {
      alert('Complete todos los campos');
    }
  }

  regresar() {
    this.router.navigate(['/presupuesto']);
  }
}
