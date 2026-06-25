import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
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
    MatInput
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
      montoPromedioMensual: ['', Validators.required],
    });
  }

  registrar() {
    if (this.presupuestoForm.valid) {
      let presupuesto = new Presupuesto();
      presupuesto.nombrePresupuesto = this.presupuestoForm.controls['nombrePresupuesto'].value;
      presupuesto.montoPromedioMensual = this.presupuestoForm.controls['montoPromedioMensual'].value;
      console.log(presupuesto);
      this.presupuestoService.insert(presupuesto).subscribe({
        next: data => { alert('Presupuesto registrado con exito');
          this.router.navigate(['/presupuesto']); },
      });
    } else {
      alert('Complete todos los campos');
    }
  }

  regresar() {
    this.router.navigate(['/presupuesto']);
  }
}
