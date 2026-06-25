import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {
  MatFormField,
  MatHint,
  MatInput,
  MatInputModule,
  MatLabel }
  from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
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
      fechaLimite: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  registrar() {
    if (this.metaForm.valid) {
      let meta = new Meta();
      meta.nombreMeta = this.metaForm.controls['nombreMeta'].value;
      meta.montoObjetivo = this.metaForm.controls['montoObjetivo'].value;
      meta.descripcion = this.metaForm.controls['descripcion'].value;

      // el modelo sigue siendo Date; solo formateo la fecha para que el backend la acepte
      const f: Date = this.metaForm.controls['fechaLimite'].value;
      (meta as any).fechaLimite = f.toISOString().split('T')[0];

      console.log('Mandando meta:', meta);
      this.metaService.insert(meta).subscribe({
        next: data => {
          alert('Meta registrada con exito');
          this.router.navigate(['/metas']);
        },
        error: err => {
          console.log(err);
          alert('Error: ' + (err.error?.message || err.error || err.status));
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
