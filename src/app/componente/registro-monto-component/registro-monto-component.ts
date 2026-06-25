import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MovimientoService} from '../../services/movimiento-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Movimiento} from '../../model/movimiento';

@Component({
  selector: 'app-registro-monto-component',
  imports: [ReactiveFormsModule, MatCard, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, MatButton],
  templateUrl: './registro-monto-component.html',
  styleUrl: './registro-monto-component.css',
})
export class RegistroMontoComponent {
  movimientoForm: FormGroup;
  tipo: string = '';
  fb = inject(FormBuilder);
  movimientoService = inject(MovimientoService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.movimientoForm = this.fb.group({
      monto: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.tipo = this.route.snapshot.params['tipo'];
  }

  registrar() {
    if (this.movimientoForm.valid) {
      let movimiento = new Movimiento();
      movimiento.tipo = this.tipo;
      movimiento.monto = this.movimientoForm.controls['monto'].value;
      this.movimientoService.insert(movimiento).subscribe({
        next: data => {
          alert(this.tipo + ' registrado con exito');
          this.router.navigate(['/home']);
        },
      });
    } else {
      alert('Ingrese un monto');
    }
  }

  regresar() {
    this.router.navigate(['/home']);
  }
}
