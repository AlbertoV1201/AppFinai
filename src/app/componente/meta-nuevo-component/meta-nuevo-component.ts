import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatHint, MatInput, MatInputModule, MatLabel } from '@angular/material/input';

import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';

import { MetaService } from '../../services/meta-service';
import { Meta } from '../../model/meta';

@Component({
  selector: 'app-meta-nuevo-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInput,
    MatHint,
  ],
  templateUrl: './meta-nuevo-component.html',
  styleUrl: './meta-nuevo-component.css',
})
export class MetaNuevoComponent {
  metaForm: FormGroup;

  fb = inject(FormBuilder);
  metaService = inject(MetaService);
  router = inject(Router);

  constructor() {
    this.metaForm = this.fb.group({
      nombreMeta: ['', Validators.required],

      montoObjetivo: ['', Validators.required],

      montoActual: ['', Validators.required],

      fechaLimite: ['', Validators.required],

      descripcion: ['', Validators.required],
    });
  }

  registrar() {
    if (this.metaForm.valid) {
      let meta = new Meta();

      meta.nombreMeta = this.metaForm.value.nombreMeta;

      meta.montoObjetivo = this.metaForm.value.montoObjetivo;

      meta.montoActual = this.metaForm.value.montoActual;

      meta.descripcion = this.metaForm.value.descripcion;

      const f: Date = this.metaForm.value.fechaLimite;

      (meta as any).fechaLimite = f.toISOString().split('T')[0];

      console.log(meta);

      this.metaService.insert(meta).subscribe({
        next: () => {
          alert('Meta registrada con éxito');

          this.router.navigate(['/metas']);
        },

        error: (err) => {
          console.error(err);

          alert('Error al registrar la meta');
        },
      });
    } else {
      alert('Complete todos los campos');
    }
  }

  regresar() {
    this.router.navigate(['/metas']);
  }
}
