import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { TicketService } from '../../services/ticket-service';
import { Ticket } from '../../model/ticket';

@Component({
  selector: 'app-ticket-nuevo-component',
  standalone: true,
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
  ],
  templateUrl: './ticket-nuevo-component.html',
  styleUrl: './ticket-nuevo-component.css',
})
export class TicketNuevoComponent {
  ticketForm: FormGroup;

  fb = inject(FormBuilder);
  ticketService = inject(TicketService);
  router = inject(Router);

  constructor() {
    this.ticketForm = this.fb.group({
      asunto: ['', Validators.required],

      mensaje: ['', Validators.required],
    });
  }

  registrar() {
    if (this.ticketForm.valid) {
      let ticket = new Ticket();

      ticket.asunto = this.ticketForm.value.asunto;

      ticket.mensaje = this.ticketForm.value.mensaje;

      this.ticketService.insert(ticket).subscribe({
        next: () => {
          alert('Ticket enviado correctamente.');

          this.router.navigate(['/tickets']);
        },

        error: (err) => {
          console.error(err);

          alert('No se pudo registrar el ticket.');
        },
      });
    } else {
      alert('Complete todos los campos.');
    }
  }

  regresar() {
    this.router.navigate(['/tickets']);
  }
}
